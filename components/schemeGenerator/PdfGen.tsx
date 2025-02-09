'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { Button, Chip } from '@heroui/react';
import autoTable from 'jspdf-autotable';
import { getTotalLessons } from '@/lib/Mathfunctions';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { authClient } from '@/auth-client';
import { ArrowLeft, ArrowRight, EyeIcon, Plus } from 'lucide-react';
import { clearData, setCurrentStep } from '@/store/slices/SchemeSlice';
import { BankInformation, DeductFromBank } from '@/actions/queries';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const PdfGen = ({ data }: { data: any }) => {
  const formdata: any = useAppSelector((state) => state.schemes.formData);
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]); // State for table data preview

  // Provide default values to avoid undefined errors
  const [lessonsPerWeek] = useState(formdata?.lessonsPerWeek || 1);
  const [startWeek] = useState(formdata?.startWeek || 1);
  const [startLesson] = useState(formdata?.startLesson || 1);
  const [endWeek] = useState(formdata?.endWeek || 10);
  const [endLesson] = useState(formdata?.endLesson || lessonsPerWeek);
  const [addBreaks] = useState(formdata?.addBreaks || false);
  const [breaks] = useState(formdata?.breaks || []);
  const [doubleLesson] = useState(formdata?.doubleLesson || []);

  const totalLessons = getTotalLessons(
    startWeek,
    endWeek,
    startLesson,
    endLesson,
    lessonsPerWeek,
    breaks,
    addBreaks,
    doubleLesson
  );
  console.log('Total Teachable Lessons:', totalLessons);

  // Make sure data is defined
  const myAdjustedData: any[] = [...(data || [])];

  // Calculate how many additional topics need to be added
  const topicsToAdd = totalLessons - myAdjustedData.length;
  if (topicsToAdd > 0) {
    while (myAdjustedData.length < totalLessons) {
      const randomIndex = Math.floor(Math.random() * myAdjustedData.length);
      const randomTopic = myAdjustedData[randomIndex];
      myAdjustedData.splice(randomIndex + 1, 0, randomTopic);
      // Uncomment if you need debugging info:
      // console.log(`Duplicated topic from index ${randomIndex} and inserted at ${randomIndex + 1}`);
    }
  }

  // Wrap createPDF in useCallback so that its reference stays stable
  const createPDF = useCallback(async (): Promise<any[]> => {
    setLoading(true);
    // Increase delay to ensure the loading indicator is rendered before heavy processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
      unit: 'mm',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Header content
    doc.setFontSize(24);
    doc.text('Name..........................', centerX - 8, 35, { align: 'right' });
    doc.text('TSC No..........................', centerX, 50, { align: 'right' });
    doc.setFontSize(32);
    doc.text(formdata?.schoolName?.toLocaleUpperCase() || 'SCHOOL NAME', centerX, 80, { align: 'center' });
    doc.text(
      `${formdata?.term?.toLocaleUpperCase() || 'TERM'}  ${formdata?.class?.toLocaleUpperCase() || 'CLASS'}`,
      centerX,
      100,
      { align: 'center' }
    );
    doc.text(`Year: ${formdata?.year || 'N/A'}`, centerX, 120, { align: 'center' });
    doc.addPage();

    const headers = [
      ['Week', 'Lesson', 'Topic(s)', 'Sub-Topic(s)', 'Objectives', 'T/L Activities', 'T/L Aids', 'Reference'],
    ];

    const lessons: any[] = [];
    const totalTopics = myAdjustedData.length;
    const topicsPerLesson = Math.floor(totalTopics / totalLessons);
    let extraTopics = totalTopics % totalLessons;
    let topicIndex = 0;

    for (let week = startWeek; week <= endWeek; week++) {
      for (let lesson = 1; lesson <= lessonsPerWeek; lesson++) {
        if (week === startWeek && lesson < startLesson) continue;
        if (week === endWeek && lesson > endLesson) break;

        const breakInfo = addBreaks
          ? breaks.find(
              (b: any) =>
                (week > b.startWeek || (week === b.startWeek && lesson >= b.startLesson)) &&
                (week < b.endWeek || (week === b.endWeek && lesson <= b.endLesson))
            )
          : null;

        if (breakInfo) {
          // Add a break row with centered, bold, red text.
          lessons.push([
            {
              content: `${breakInfo.title}: Week ${breakInfo.startWeek} lesson ${breakInfo.startLesson} to Week ${breakInfo.endWeek} lesson ${breakInfo.endLesson}`,
              colSpan: headers[0].length,
              styles: { halign: 'center', fontStyle: 'bold', textColor: [255, 0, 0] },
            },
          ]);

          // Skip lessons covered by the break
          while (
            (week < breakInfo.endWeek || (week === breakInfo.endWeek && lesson < breakInfo.endLesson)) &&
            lesson <= lessonsPerWeek
          ) {
            lesson++;
          }
          if (lesson > lessonsPerWeek) break;
          continue;
        }

        // Handle double lessons safely by ensuring doubleLesson is an array
        if (Array.isArray(doubleLesson) && doubleLesson.includes(lesson) && topicIndex < myAdjustedData.length) {
          const currentTopicsCount = topicsPerLesson + (extraTopics > 0 ? 1 : 0);
          const assignedTopics = myAdjustedData.slice(topicIndex, topicIndex + currentTopicsCount);

          const combinedTopic = assignedTopics.map((t) => t.TOPIC).join(', ');
          const combinedSubTopic = assignedTopics.map((t) => t.SUBTOPIC).join(', ');
          const combinedObjectives = assignedTopics.map((t) => t.OBJECTIVES).join('; ');
          const combinedActivities = assignedTopics.map((t) => t.ACTIVITIES).join('; ');
          const combinedAids = assignedTopics.map((t) => t.AIDS).join(', ');
          const combinedReference = assignedTopics.map((t) => t.REFERENCE).join('; ');

          lessons.push([
            week,
            `${lesson} and ${lesson + 1}`,
            combinedTopic,
            combinedSubTopic,
            combinedObjectives,
            combinedActivities,
            combinedAids,
            combinedReference,
          ]);

          topicIndex += currentTopicsCount;
          if (extraTopics > 0) extraTopics--;
          lesson++; // skip the next lesson because of the double lesson
        } else if (topicIndex < myAdjustedData.length) {
          const currentTopicsCount = topicsPerLesson + (extraTopics > 0 ? 1 : 0);
          const assignedTopics = myAdjustedData.slice(topicIndex, topicIndex + currentTopicsCount);

          const combinedTopic = assignedTopics.map((t) => t.TOPIC).join(', ');
          const combinedSubTopic = assignedTopics.map((t) => t.SUBTOPIC).join(', ');
          const combinedObjectives = assignedTopics.map((t) => t.OBJECTIVES).join('; ');
          const combinedActivities = assignedTopics.map((t) => t.ACTIVITIES).join('; ');
          const combinedAids = assignedTopics.map((t) => t.AIDS).join(', ');
          const combinedReference = assignedTopics.map((t) => t.REFERENCE).join('; ');

          lessons.push([
            week,
            lesson,
            combinedTopic,
            combinedSubTopic,
            combinedObjectives,
            combinedActivities,
            combinedAids,
            combinedReference,
          ]);

          topicIndex += currentTopicsCount;
          if (extraTopics > 0) extraTopics--;
        } else {
          lessons.push([week, lesson, 'No Topic Assigned', '', '', '', '', '']);
        }
      }
    }

    setTableData(lessons);
    autoTable(doc, {
      head: headers,
      body: lessons,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [229, 228, 226], textColor: [0, 0, 0] },
      theme: 'grid',
    });

    const pdfDataUri = doc.output('datauristring');
    setPdfDataUrl(pdfDataUri);
    setLoading(false);
    return lessons;
  }, [
    addBreaks,
    breaks,
    doubleLesson,
    endLesson,
    endWeek,
    formdata,
    lessonsPerWeek,
    myAdjustedData,
    session,
    startLesson,
    startWeek,
    totalLessons,
  ]);

  const dispatch = useAppDispatch();
  const currentStepValue = useAppSelector((state) => state.schemes.currentStep);
  const { toast } = useToast();
  const router = useRouter();

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStepValue - 1));
  };

  const openTablePreviewInNewTab = async () => {
    // Await the PDF creation and get the lessons data directly
    const lessons = await createPDF();

    // If lessons data is empty, exit early
    if (!lessons || lessons.length === 0) return;

    // Open a new tab (note: we remove the third parameter so that it opens as a tab)
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Table Preview</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                margin: 0;
                padding: 20px;
                font-family: sans-serif;
              }
              .table-container {
                transform: scale(0.8);
                transform-origin: top left;
                width: 125%;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              .header-section {
                margin-bottom: 20px;
              }
              .header-section .name-tsc {
                display: flex;
                justify-content: space-between;
              }
              .header-section .school-name {
                text-align: center;
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .header-section .term-class {
                text-align: center;
                font-size: 32px;
                margin-bottom: 10px;
              }
              .header-section .year {
                text-align: center;
                font-size: 32px;
                margin-bottom: 20px;
              }
              .back-button {
                position: fixed;
                top: 10px;
                left: 10px;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                z-index:1000;
              }
            </style>
          </head>
          <body>
            <button class="back-button" onclick="window.close()">Back</button>
            <div class="header-section">
              <div class="school-name">${formdata?.schoolName?.toLocaleUpperCase() || 'SCHOOL NAME'}</div>
              <div class="term-class">${formdata?.term?.toLocaleUpperCase() || 'TERM'} ${formdata?.class?.toLocaleUpperCase() || 'CLASS'}</div>
              <div class="year">Year: ${formdata?.year || 'N/A'}</div>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Week</th>
                    <th>Lesson</th>
                    <th>Topic(s)</th>
                    <th>Sub-Topic(s)</th>
                    <th>Objectives</th>
                    <th>T/L Activities</th>
                    <th>T/L Aids</th>
                    <th>Reference</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  ${lessons
                    .map((row) => {
                      return `<tr>${row
                        .map((cell: any) => {
                          if (typeof cell === 'object' && cell !== null && cell.content) {
                            let inlineStyle = "";
                            if(cell.styles) {
                              if(
                                cell.styles.textColor &&
                                cell.styles.textColor[0] === 255 &&
                                cell.styles.textColor[1] === 0 &&
                                cell.styles.textColor[2] === 0
                              ) {
                                inlineStyle += "color: red;";
                              }
                              if(cell.styles.halign === 'center') {
                                inlineStyle += " text-align: center;";
                              }
                              if(cell.styles.fontStyle && cell.styles.fontStyle === 'bold') {
                                inlineStyle += " font-weight: bold;";
                              }
                            }
                            const colSpan = cell.colSpan || 1;
                            return `<td colspan="${colSpan}" style="${inlineStyle}">${cell.content}</td>`;
                          }
                          return `<td>${cell}</td>`;
                        })
                        .join('')}</tr>`;
                    })
                    .join('')}
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `);
      newTab.document.close();
    }
  };

  // A function to handle payment (if needed) and then trigger PDF download
  const payAndDownloadFunction = async () => {
    // (Optionally add payment processing logic here)

    // If PDF is not generated, call createPDF first
    if (!pdfDataUrl) {
      await createPDF();
    }

    const getBankInfo = await BankInformation();
    if (!getBankInfo) {
      return toast({
        title: "Something went wrong",
        description: "Could not access your wallet",
        variant: "destructive"
      });
    }
    const getBankBalance = await getBankInfo?.amount;
    if (getBankBalance < 10) {
      router.push('/wallet');
      return toast({
        title: "Please top up your account",
        description: "You don't have enough funds",
        variant: "destructive"
      });
    }
    const AmountToDeduct = getBankBalance - 25;
    const deductMoneyFromBank = await DeductFromBank(getBankInfo.id, AmountToDeduct);
    if (!deductMoneyFromBank) {
      return toast({
        title: "Something went wrong",
        description: "Could not process your payment",
        variant: "destructive"
      });
    }

    // Trigger download using an anchor element
    if (pdfDataUrl) {
      toast({
        title: "Please wait.........",
        description: "Your download process has been queued",
      });
      const link = document.createElement('a');
      link.href = pdfDataUrl;
      link.download = `${formdata?.subject}-${formdata?.schoolName}-${formdata?.year}-${session?.user.id}-${totalLessons}-${lessonsPerWeek}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      createAnotherScheme();
    }
  };

  const createAnotherScheme = async () => {
    dispatch(clearData({}));
    router.refresh();
  };

  return (
    <div className="space-y-10">
      {pdfDataUrl ? (
        <div>
          <Chip className={`${loading ? 'bg-emerald-600' : 'bg-red-500'} text-white`}>
            {loading ? 'status: Generating Scheme' : 'status: idle'}
          </Chip>
          <div className="mt-4 flex items-center md:gap-2 flex-col-reverse md:flex-row gap-2">
            <Button onPress={payAndDownloadFunction} className="w-full md:w-fit bg-blue-600 text-white" radius="sm" endContent={<ArrowRight />}>
              Pay & Download
            </Button>
            <Button onPress={createAnotherScheme} className="w-full md:w-fit text-gray-800 dark:text-gray-50" endContent={<Plus />}>
              Create another scheme
            </Button>
          </div>
          <div className="mt-4 flex items-center md:justify-between md:flex-row gap-2 flex-col">
            <Button onPress={handlePrevious} className="w-full md:w-fit" radius="sm" startContent={<ArrowLeft></ArrowLeft>}>
              Back
            </Button>
            <Button radius="sm" variant='bordered' onPress={openTablePreviewInNewTab} className="w-full" endContent={<EyeIcon />}>
              Preview Scheme
            </Button>
          </div>
        </div>
      ) : (
        totalLessons > 2 && (
          <div className="space-y-4">
            <Chip className={`${loading ? 'bg-emerald-600' : 'bg-red-500'} text-white`}>
              {loading ? 'status: Generating Scheme' : 'status: idle'}
            </Chip>
            <Button className="bg-blue-600 text-white w-full" onPress={createPDF} endContent={<ArrowRight />} radius="sm">
              Generate PDF
            </Button>
            <Button onPress={handlePrevious} className="w-full md:w-fit" radius="sm" startContent={<ArrowLeft></ArrowLeft>}>
              Back
            </Button>
          </div>
        )
      )}
      {/* {pdfDataUrl && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc' }}>
          <iframe src={pdfDataUrl} style={{ width: '100%', height: '500px', border: 'none' }} title="PDF Preview" />
        </div>
      )} */}
    </div>
  );
};

export default PdfGen;

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
import { BankInformation, DeductFromBank, SaveGeneratedPdfData } from '@/actions/queries';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const PdfGen = ({ data }: { data: any }) => {
  const formdata = useAppSelector((state) => state.schemes.formData);
  const [schemeType, setSchemeType] = useState<'primary' | 'secondary' | any>(formdata?.schoolLevel);
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  // Default form values (avoid undefined errors)
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

  // Use the passed data (or empty array if undefined)
  const myAdjustedData: any[] = [...(data || [])];

  // Add extra topics if needed
  const topicsToAdd = totalLessons - myAdjustedData.length;
  if (topicsToAdd > 0) {
    while (myAdjustedData.length < totalLessons) {
      const randomIndex = Math.floor(Math.random() * myAdjustedData.length);
      const randomTopic = myAdjustedData[randomIndex];
      myAdjustedData.splice(randomIndex + 1, 0, randomTopic);
    }
  }

  // Define headers for secondary and primary schemes
  const secondaryHeaders = [
    ['Week', 'Lesson', 'Topic(s)', 'Sub-Topic(s)', 'Objectives', 'T/L Activities', 'T/L Aids', 'Reference', 'Remarks'],
  ];
  const primaryHeaders = [
    ['Week', 'Lesson', 'Strands', 'Substrands', 'Lesson-Learning-Outcomes', 'Core-Competence', 'Values', 'L_Experiences', 'L_Resources', 'Assessment', 'Remarks'],
  ];

  // Pick the header based on the scheme type
  const headers = schemeType === 'primary' ? primaryHeaders : secondaryHeaders;

  // Generate lessons rows based on the selected scheme type.
  const generateLessons = () => {
    const lessons: any[] = [];
    const totalTopics = myAdjustedData.length;
    const topicsPerLesson = Math.floor(totalTopics / totalLessons);
    let extraTopics = totalTopics % totalLessons;
    let topicIndex = 0;

    // Loop through weeks and lessons
    for (let week = startWeek; week <= endWeek; week++) {
      for (let lesson = 1; lesson <= lessonsPerWeek; lesson++) {
        if (week === startWeek && lesson < startLesson) continue;
        if (week === endWeek && lesson > endLesson) break;

        // Check for breaks
        const breakInfo = addBreaks
          ? breaks.find(
              (b) =>
                (week > b.startWeek || (week === b.startWeek && lesson >= b.startLesson)) &&
                (week < b.endWeek || (week === b.endWeek && lesson <= b.endLesson))
            )
          : null;
        if (breakInfo) {
          // Avoid duplicate break rows
          const isBreakAlreadyAdded = lessons.some(
            (row) =>
              typeof row[0] === 'object' &&
              row[0].content.includes(
                `${breakInfo.title}: Week ${breakInfo.startWeek} lesson ${breakInfo.startLesson} to Week ${breakInfo.endWeek} lesson ${breakInfo.endLesson}`
              )
          );
          if (!isBreakAlreadyAdded) {
            lessons.push([
              {
                content: `${breakInfo.title}: Week ${breakInfo.startWeek} lesson ${breakInfo.startLesson} to Week ${breakInfo.endWeek} lesson ${breakInfo.endLesson}`,
                colSpan: headers[0].length,
                styles: { halign: 'center', fontStyle: 'bold', textColor: [255, 0, 0] },
              },
            ]);
          }
          // Skip lessons that fall under the break period
          while (
            (week < breakInfo.endWeek || (week === breakInfo.endWeek && lesson < breakInfo.endLesson)) &&
            lesson <= lessonsPerWeek
          ) {
            lesson++;
          }
          if (lesson > lessonsPerWeek) break;
          continue;
        }

        // Calculate topics for this lesson
        const currentTopicsCount = topicsPerLesson + (extraTopics > 0 ? 1 : 0);
        const assignedTopics = myAdjustedData.slice(topicIndex, topicIndex + currentTopicsCount);
        topicIndex += currentTopicsCount;
        if (extraTopics > 0) extraTopics--;

        if (schemeType === 'primary') {
          // Updated variable names to match the pp1mathematics model:
          const combinedStrands = assignedTopics.map((t) => t.STRANDS || '').join(', ');
          const combinedSubstrands = assignedTopics.map((t) => t.SUBSTRANDS || '').join(', ');
          const combinedOutcome = assignedTopics.map((t) => t.LLOUTCOMES || '').join(', ');
          const combinedCompetence = assignedTopics.map((t) => t.CORECOMPETENCE || '').join(', ');
          const combinedValues = assignedTopics.map((t) => t.VALUES || '').join(', ');
          const combinedExperiences = assignedTopics.map((t) => t.LEXPERIENCES || '').join(', ');
          const combinedResources = assignedTopics.map((t) => t.LRESOURCES || '').join(', ');
          const combinedAssessment = assignedTopics.map((t) => t.ASSESSMENT || '').join(', ');

          lessons.push([
            week,
            lesson,
            combinedStrands,
            combinedSubstrands,
            combinedOutcome,
            combinedCompetence,
            combinedValues,
            combinedExperiences,
            combinedResources,
            combinedAssessment,
            '', // Remarks can be added here if needed
          ]);
        } else {
          // For secondary scheme, using the fields already provided
          const combinedTopic = assignedTopics.map((t) => t.TOPIC || '').join(', ');
          const combinedSubTopic = assignedTopics.map((t) => t.SUBTOPIC || '').join(', ');
          const combinedObjectives = assignedTopics.map((t) => t.OBJECTIVES || '').join('; ');
          const combinedActivities = assignedTopics.map((t) => t.ACTIVITIES || '').join('; ');
          const combinedAids = assignedTopics.map((t) => t.AIDS || '').join(', ');
          const combinedReference = assignedTopics.map((t) => t.REFERENCE || '').join('; ');

          lessons.push([
            week,
            lesson,
            combinedTopic,
            combinedSubTopic,
            combinedObjectives,
            combinedActivities,
            combinedAids,
            combinedReference,
            '', // Remarks column
          ]);
        }
      }
    }
    return lessons;
  };

  // Wrap createPDF in useCallback so its reference stays stable
  const createPDF = useCallback(async (): Promise<any[]> => {
    setLoading(true);
    // Ensure the loading indicator renders before heavy processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
      unit: 'mm',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // First page header content (common for both types)
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

    // Generate the lessons rows based on the selected scheme type.
    const lessons = generateLessons();
    setTableData(lessons);

    const leftMargin = 10; // mm, adjust as needed
    const rightMargin = 10; // mm, adjust as needed
    const tableWidth = pageWidth - leftMargin - rightMargin;
    const numColumns = headers[0].length;
    const equalWidth = tableWidth / numColumns;
    // Use the chosen headers when calling autoTable

    const columnStyles:any = {
      0: { cellWidth: 10 }, // Week column (smallest)
      1: { cellWidth: 10 }, // Lesson column (slightly bigger)
      7:{cellWidth:40}
    };

    autoTable(doc, {
      margin: { left: leftMargin, right: rightMargin },
      head: headers,
      body: lessons,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [229, 228, 226], textColor: [0, 0, 0] },
      theme: 'grid',
      columnStyles, // Apply equal width to each column
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
    headers,
    lessonsPerWeek,
    myAdjustedData,
    startLesson,
    startWeek,
    totalLessons,
    schemeType,
  ]);

  const dispatch = useAppDispatch();
  const currentStepValue = useAppSelector((state) => state.schemes.currentStep);
  const { toast } = useToast();
  const router = useRouter();

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStepValue - 1));
  };

  const openTablePreviewInNewTab = async () => {
    const lessons = await createPDF();
    if (!lessons || lessons.length === 0) return;

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
                    ${headers[0].map((headerTitle) => `<th>${headerTitle}</th>`).join('')}
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

  const payAndDownloadFunction = async () => {
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

      await SaveGeneratedPdfData({
        userId: session?.user.id,
        schoolName: formdata?.schoolName,
        schoolLevel: formdata?.schoolLevel,
        subject: formdata?.subject,
        term: formdata?.term,
        year: formdata?.year,
        selectedTopics: formdata?.selectedTopics,
        lessonsPerWeek,
        startWeek,
        startLesson,
        endWeek,
        endLesson,
        addBreaks,
        breaks: formdata?.breaks,
        doubleLesson: formdata?.doubleLesson,
        className: formdata?.class
      });
      
      createAnotherScheme();
    }
  };

  const createAnotherScheme = async () => {
    dispatch(clearData({}));
    router.refresh();
  };

  return (
    <div className="space-y-10">
      {/* Optionally, add UI controls to let the user choose between primary and secondary */}

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
            <Button onPress={handlePrevious} className="w-full md:w-fit" radius="sm" startContent={<ArrowLeft />}>
              Back
            </Button>
            <Button radius="sm" variant='bordered' onPress={openTablePreviewInNewTab} className="w-full" endContent={<EyeIcon />}>
              Preview Scheme
            </Button>
          </div>
        </div>
      ) : (
        totalLessons > 2 && myAdjustedData && (
          <div className="space-y-4">
            <Chip className={`${loading ? 'bg-emerald-600' : 'bg-red-500'} text-white`}>
              {loading ? 'status: Generating Scheme' : 'status: idle'}
            </Chip>
            <Button className="bg-blue-600 text-white w-full" onPress={createPDF} endContent={<ArrowRight />} radius="sm">
              Generate PDF
            </Button>
            <Button onPress={handlePrevious} className="w-full md:w-fit" radius="sm" startContent={<ArrowLeft />}>
              Back
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default PdfGen;

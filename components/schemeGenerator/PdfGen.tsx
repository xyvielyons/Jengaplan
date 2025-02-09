'use client';
import React, { useImperativeHandle, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button, Chip } from '@heroui/react';
import autoTable from 'jspdf-autotable';
import { getTotalLessons } from '@/lib/Mathfunctions';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { authClient } from '@/auth-client';
import { ArrowLeft, ArrowRight, EyeIcon, Plus } from 'lucide-react';
import { setCurrentStep } from '@/store/slices/SchemeSlice';
import TablePreview from './TablePreview';

const PdfGen = ({data}: { data: any}) => {
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
      console.log(`Duplicated topic from index ${randomIndex} and inserted at ${randomIndex + 1}`);
    }
  }

  const createPDF = async (): Promise<any[]> => {
    setLoading(true);
    // Increase delay to ensure the loading indicator is rendered before heavy processing starts
    await new Promise((resolve) => setTimeout(resolve, 200));

    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
      unit: 'mm',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Use optional chaining and default text to avoid errors if a property is missing
    doc.setFontSize(32);
    doc.text(formdata?.schoolName?.toLocaleUpperCase() || 'SCHOOL NAME', centerX, 60, { align: 'center' });
    doc.text(
      `${formdata?.term?.toLocaleUpperCase() || 'TERM'}  ${formdata?.class?.toLocaleUpperCase() || 'CLASS'}`,
      centerX,
      80,
      { align: 'center' }
    );
    doc.text(`Year: ${formdata?.year || 'N/A'}`, centerX, 100, { align: 'center' });
    doc.text(`${session?.user?.name || 'User Name'}`, centerX, 140, { align: 'center' });
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
  };

  const dispatch = useAppDispatch();
  const currentStepValue = useAppSelector((state) => state.schemes.currentStep);

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStepValue - 1));
  };

  const openTablePreviewInNewTab = async () => {
    // Await the PDF creation and get the lessons data directly
    const lessons = await createPDF();

    // If lessons data is empty, exit early
    if (!lessons || lessons.length === 0) return;

    const newWindow = window.open('', '_blank', 'width=1200,height=800');
    if (newWindow) {
      newWindow.document.write(`
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
            </style>
          </head>
          <body>
            <h2 style="text-align: center;">PDF Content Preview</h2>
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
                            const colSpan = cell.colSpan || 1;
                            return `<td colspan="${colSpan}">${cell.content}</td>`;
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
      newWindow.document.close();
    }
  };

  return (
    <div className="space-y-8">
      {pdfDataUrl && (
        <div className="">
            <Chip className={`${loading ? 'bg-emerald-600' : 'bg-red-500'} text-white`}>
              {loading ? 'status: Generating Scheme' : 'status: idle'}
            </Chip>
            <div className="mt-4 flex items-center md:gap-2 flex-col-reverse md:flex-row gap-2">
              <Button onPress={handlePrevious} className="w-full md:w-fit bg-blue-600 text-white" radius="sm" endContent={<ArrowRight />}>
                Pay & Download
              </Button>
              <Button onPress={openTablePreviewInNewTab} className="w-full md:w-fit text-gray-800 dark:text-gray-50" endContent={<Plus />}>
                Create another scheme
              </Button>
            </div>
            <div className="mt-4 flex items-center md:justify-between md:flex-row gap-2">
              <Button onPress={handlePrevious} className="w-full md:w-fit" radius="sm">
                Back
              </Button>
              <Button radius="none" onPress={openTablePreviewInNewTab} className="bg-gray-600 text-white w-full md:w-fit" endContent={<EyeIcon />}>
                Preview Scheme
              </Button>
            </div>
        </div>
      )}
      {!pdfDataUrl && (
        <div className="">
          <Button className='bg-blue-600 text-white w-full' onPress={createPDF} endContent={<ArrowRight></ArrowRight>} radius='sm' >Generate Pdf</Button>
        </div>
      )}
      
      {pdfDataUrl && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc' }}>
          <iframe src={pdfDataUrl} style={{ width: '100%', height: '500px', border: 'none' }} title="PDF Preview" />
        </div>
      )}
    </div>
  );
};

export default PdfGen;

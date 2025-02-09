'use client';
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@heroui/react';
import autoTable from 'jspdf-autotable';
import { getTotalLessons } from '@/lib/Mathfunctions';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { authClient } from '@/auth-client';
import { ArrowLeft, ArrowRight, EyeIcon, Plus } from 'lucide-react';
import { setCurrentStep } from '@/store/slices/SchemeSlice';
import TablePreview from './TablePreview';
const PdfGen = ({ data }: { data: any }) => {
  const formdata: any = useAppSelector((state) => state.schemes.formData);
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]); // State for table data preview

  const [lessonsPerWeek] = useState(formdata?.lessonsPerWeek);
  const [startWeek] = useState(formdata?.startWeek);
  const [startLesson] = useState(formdata?.startLesson);
  const [endWeek] = useState(formdata?.endWeek);
  const [endLesson] = useState(formdata?.endLesson);
  const [addBreaks] = useState(formdata?.addBreaks);
  const [breaks] = useState(formdata?.breaks);
  const [doubleLesson] = useState(formdata?.doubleLesson);
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
 
  const myAdjustedData: any[] = [...data]; // Start with the original topics

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

  const createPDF = async () => {
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

    doc.setFontSize(32);
    doc.text(formdata?.schoolName?.toLocaleUpperCase(), centerX, 60, { align: 'center' });
    doc.text(`${formdata?.term?.toLocaleUpperCase()}  ${formdata?.class?.toLocaleUpperCase()} `, centerX, 80, { align: 'center' });
    doc.text(`Year: ${formdata?.year}`, centerX, 100, { align: 'center' });
    doc.text(`${session?.user.name}`, centerX, 140, { align: 'center' });
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

        const breakInfo = addBreaks ? breaks.find(
          (b: any) =>
            (week > b.startWeek || (week === b.startWeek && lesson >= b.startLesson)) &&
            (week < b.endWeek || (week === b.endWeek && lesson <= b.endLesson))
        ) : null;

        if (breakInfo) {
          const isBreakAlreadyAdded = lessons.some(
            (row) =>
              typeof row[0] === 'object' &&
              row[0].content.includes(`${breakInfo.title}: Week ${breakInfo.startWeek} lesson ${breakInfo.startLesson} to Week ${breakInfo.endWeek} lesson ${breakInfo.endLesson}`)
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

        // Handle double lessons
        if (doubleLesson.includes(lesson) && topicIndex < myAdjustedData.length) {
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
          lesson++;
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
  };

  const dispatch = useAppDispatch();
  const currentStepValue = useAppSelector((state) => state.schemes.currentStep);

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStepValue - 1));
  };

  const openTablePreviewInNewTab = () => {
    createPDF()
    if (!tableData || tableData.length === 0) return;
  
    const newWindow = window.open("", "_blank", "width=1200,height=800");
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
                  ${tableData
                    .map((row) => {
                      return `<tr>${row
                        .map((cell: any) => {
                          if (typeof cell === "object" && cell !== null && cell.content) {
                            // Use colSpan if provided; otherwise default to 1.
                            const colSpan = cell.colSpan || 1;
                            return `<td colspan="${colSpan}">${cell.content}</td>`;
                          }
                          return `<td>${cell}</td>`;
                        })
                        .join("")}</tr>`;
                    })
                    .join("")}
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
    <div>
      <h1>Generate PDF</h1>
      <Button onPress={createPDF}>
        {loading ? "Generating PDF..." : "Create PDF"}
      </Button>
      <div className="mt-4 flex items-center md:justify-between flex-col-reverse md:flex-row">
        <Button onPress={handlePrevious} className='w-full md:w-fit' radius='sm'>
          Back
        </Button>
        <Button onPress={openTablePreviewInNewTab} className='bg-gray-900 text-white w-full md:w-fit' endContent={<EyeIcon></EyeIcon>}>
          Preview Scheme
        </Button>
      </div>
      {/* {pdfDataUrl && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc" }}>
          <iframe
            src={pdfDataUrl}
            style={{ width: "100%", height: "500px", border: "none" }}
            title="PDF Preview"
          />
        </div>
      )} */}
    </div>
  );
};

export default PdfGen;

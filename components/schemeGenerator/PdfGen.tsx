'use client';
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import autoTable from 'jspdf-autotable';
import { getTotalLessons} from '@/lib/Mathfunctions';
import { useAppSelector } from '@/hooks/hooks';
import { authClient } from '@/auth-client';

const PdfGen = ({data}: {
  data:any,
}) => {
  const formdata:any = useAppSelector((state)=>state.schemes.formData)
  const {data:session} = authClient.useSession()
  const [loading, setLoading] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  const [lessonsPerWeek, setLessonsPerWeek] = useState(formdata?.lessonsPerWeek);
  const [startWeek, setStartWeek] = useState(formdata?.startWeek);
  const [startLesson, setStartLesson] = useState(formdata?.startLesson);
  const [endWeek, setEndWeek] = useState(formdata?.endWeek);
  const [endLesson, setEndLesson] = useState(formdata?.endLesson);
  const [addBreaks, setAddBreaks] = useState(formdata?.addBreaks);
  const [breaks, setBreaks] = useState(formdata?.breaks);
  const [doubleLesson, setDoubleLesson] = useState(formdata?.doubleLesson); // Example: combine lesson 1 with lesson 2

  const totalLessons = getTotalLessons(startWeek, endWeek, startLesson, endLesson, lessonsPerWeek, breaks, addBreaks,doubleLesson);
  console.log('Total Teachable Lessons:', totalLessons);
 
  const myAdjustedData: any[] = [...data]; // Start with the original topics

  // Calculate how many additional topics need to be added
  const topicsToAdd = totalLessons - myAdjustedData.length;
  
  if (topicsToAdd > 0) {
    // Loop to add topics until we reach the required total lessons
    while (myAdjustedData.length < totalLessons) {
      // Pick a random position to duplicate a topic from the current adjusted data
      const randomIndex = Math.floor(Math.random() * myAdjustedData.length);
      const randomTopic = myAdjustedData[randomIndex];
  
      // Insert the duplicated topic immediately after the original
      myAdjustedData.splice(randomIndex + 1, 0, randomTopic);
  
      // Optionally log for debugging
      console.log(`Duplicated topic from index ${randomIndex} and inserted at ${randomIndex + 1}`);
    }
  }

  const createPDF = async() => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
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
          (b:any) =>
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
            `${lesson} and ${lesson + 1}`, // Combine the lesson number
            combinedTopic,
            combinedSubTopic,
            combinedObjectives,
            combinedActivities,
            combinedAids,
            combinedReference,
          ]);

          topicIndex += currentTopicsCount;
          if (extraTopics > 0) extraTopics--;
          lesson++; // Skip the next lesson since it's part of the double lesson
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

    autoTable(doc, {
      head: headers,
      body: lessons,
      startY: 20,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: { fillColor: [229, 228, 226], textColor: [0, 0, 0] },
      theme: 'grid',
    });

    const pdfDataUri = doc.output('datauristring');
    setPdfDataUrl(pdfDataUri);
    setLoading(false);
  };

  return (
    <div>
      <h1>Generate PDF</h1>
      <Button onClick={createPDF} disabled={loading}>
        {loading ? 'Generating PDF...' : 'Create PDF'}
      </Button>
      {pdfDataUrl && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc' }}>
          <iframe
            src={pdfDataUrl}
            style={{ width: '100%', height: '500px', border: 'none' }}
            title="PDF Preview"
          />
        </div>
      )}
    </div>
  );
};

export default PdfGen;

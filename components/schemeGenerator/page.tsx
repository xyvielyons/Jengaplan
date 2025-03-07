'use client'
import { useEffect, useState } from "react";
import PdfGen from "./PdfGen";
import { getData } from "@/actions/schemes";
import { useAppSelector } from "@/hooks/hooks";

export default function SchemeGenerator() {
  const [data, setData] = useState<any[]>([]);
  const formdata: any = useAppSelector((state) => state.schemes.formData);

  // Fetch data when the class and subject are available.
  useEffect(() => {
    const fetchData = async () => {
      if (formdata?.class && formdata?.subject) {
        const fetchedData: any = await getData(formdata.class + formdata.subject);
        setData(fetchedData);
      }
    };
    fetchData();
  }, [formdata?.class, formdata?.subject]);

  // Wait until formdata is loaded.
  if (!formdata) {
    return <div>Loading...</div>;
  }

  // Determine if we are using the primary scheme (strands/substrands)
  // or the secondary scheme (topics/subtopics)
  const isPrimary = formdata?.schoolLevel === "primary";

  let filteredData: any[] = [];

  if (isPrimary) {
    // Use strands/substrands
    const includeStrands = formdata?.selectedStrands;
    const includeSubstrands = formdata?.selectedSubstrands;
    if (!includeStrands || !includeSubstrands) {
      return <div>Loading strands...</div>;
    }

    // Filter the data based on the selected strands and substrands.
    filteredData = data.filter((item: any) => {
      const strandMatch = includeStrands.includes(item.STRANDS);
      const substrandMatch =
        includeSubstrands &&
        includeSubstrands[item.STRANDS] &&
        includeSubstrands[item.STRANDS].length > 0
          ? includeSubstrands[item.STRANDS].includes(item.SUBSTRANDS)
          : true;
      return strandMatch && substrandMatch;
    });

    // Order the data based on the order in includeStrands.
    filteredData.sort(
      (a: any, b: any) =>
        includeStrands.indexOf(a.STRANDS) - includeStrands.indexOf(b.STRANDS)
    );
  } else {
    // Use topics/subtopics for secondary.
    const includeTopics = formdata?.selectedTopics;
    const includeSubtopics = formdata?.selectedSubtopics;
    if (!includeTopics || !includeSubtopics) {
      return <div>Loading topics...</div>;
    }

    // Filter the data based on the selected topics and subtopics.
    filteredData = data.filter((item: any) => {
      const topicMatch = includeTopics.includes(item.TOPIC);
      const subtopicMatch =
        includeSubtopics &&
        includeSubtopics[item.TOPIC] &&
        includeSubtopics[item.TOPIC].length > 0
          ? includeSubtopics[item.TOPIC].includes(item.SUBTOPIC)
          : true;
      return topicMatch && subtopicMatch;
    });

    // Order the data based on the order in includeTopics.
    filteredData.sort(
      (a: any, b: any) =>
        includeTopics.indexOf(a.TOPIC) - includeTopics.indexOf(b.TOPIC)
    );
  }

  return (
    <div className="p-4">
      <PdfGen data={filteredData} />
    </div>
  );
}

'use client'
import { useEffect, useState } from "react";
import PdfGen from "./PdfGen";
import { getData } from "@/actions/schemes";
import { useAppSelector } from "@/hooks/hooks";
export default function SchemeGenerator() {
  const [mathsform1data, setmathsform1data] = useState([])
  const formdata:any = useAppSelector((state)=>state.schemes.formData)

  useEffect(()=>{
    const fetchdata = async()=>{
      const mathsform1data: any = await getData(formdata?.class + formdata?.subject)
      setmathsform1data(mathsform1data)
    }
    fetchdata()
  },[])
  // Fetch the maths form 1 data
//console.log(mathsform1data[0]);

if(!formdata){
  return <div>loading....</div>
}
// Specify the topics you want to include


// Assume formdata contains selectedTopics and selectedSubtopics
const includeTopics = formdata?.selectedTopics;
const includeSubtopics = formdata?.selectedSubtopics;
if(!includeTopics || !includeSubtopics){
  return <div>loading....</div>
}

// First, filter data based on the topic and subtopic selection.
const filteredData = mathsform1data.filter((item: any) => {
  // Check that the topic is selected.
  const topicMatch = includeTopics.includes(item.TOPIC);

  // If there are subtopics selected for this topic, check that the current subtopic is among them.
  const subtopicMatch =
    includeSubtopics &&
    includeSubtopics[item.TOPIC] &&
    includeSubtopics[item.TOPIC].length > 0
      ? includeSubtopics[item.TOPIC].includes(item.SUBTOPIC)
      : true;

  return topicMatch && subtopicMatch;
});

// Now, to preserve the original topic order, sort the data based on the order in includeTopics.
const orderedData = filteredData.sort(
  (a: any, b: any) => includeTopics.indexOf(a.TOPIC) - includeTopics.indexOf(b.TOPIC)
);

//console.log(orderedTopics); // Log the ordered topics for debugging

return (
  <div className="p-4">
    <PdfGen data={orderedData} />
  </div>
);
}

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
const includeTopics = formdata?.selectedTopics

if(!includeTopics){
  return <div>loading....</div>
}

// Filter and sort the topics based on includeTopics
const filteredTopics = mathsform1data.filter((topic: any) => includeTopics.includes(topic.TOPIC));
const orderedTopics = filteredTopics.sort(
  (a: any, b: any) => includeTopics.indexOf(a.TOPIC) - includeTopics.indexOf(b.TOPIC)
);

//console.log(orderedTopics); // Log the ordered topics for debugging

return (
  <div className="p-4">
    <PdfGen data={orderedTopics} />
  </div>
);
}

import { pdflogo } from '@/public/images'
import Image from 'next/image'
import React from 'react'
import { formatDateTime } from '@/lib/Mathfunctions'
import RecentlyGenerated from '../recentlyGeneratedSchemes/page'
interface dataProps {
    pdf:any
}
const RecentlyGeneratedPdfs = ({pdf}:dataProps) => {
  const date = formatDateTime(pdf.createdAt.toString())
  return (
    
    <div className="mt-2 dark:bg-gray-800 w-full bg-gray-100 p-2 rounded-sm flex items-center gap-2 justify-between flex-col md:flex-row">
      <div className="flex gap-2">
         <div className="w-[60px] ml-2">
              <Image src={pdflogo} alt="pdflogo" width={500} height={100} className='object-fill'></Image>
          </div>
          <div className="">
            <h1 className='text-[16px] font-bold text-gray-800 dark:text-gray-100'>{pdf.schoolName}</h1>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>{`${pdf.subject} - ${pdf.class} - ${pdf.term}`}</p>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>{date}</p>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>{pdf.schoolLevel}</p>
          </div>
      </div>
        
        <div className="">
          <RecentlyGenerated pdfData={pdf}></RecentlyGenerated>
        </div>
    </div>
  )
}

export default RecentlyGeneratedPdfs
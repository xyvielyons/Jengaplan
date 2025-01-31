import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { arrow4, glitter5, homevideoimage, line3, smiley2, star1 } from '@/public/images'
type Props = {}

const HomeSection = (props: Props) => {
  return (
  <div className="w-full h-full relative" id="home">

    {/* <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute top-[150px] left-0 transform translate-x-[-50%] z-[-100] border border-green-500"></div> */}
    <div className="absolute top-[-5px] left-[80px]">
            <Image src={star1} alt='line' width={32} height={32}  className='dark:brightness-150'></Image>
    </div>
    {/* <div className="absolute right-2 bottom-[200px] md:bottom-[300px] lg:bottom-[350px] ">
            <Image src={smiley2} alt='line' width={32} height={32}  className='dark:brightness-150'></Image>
    </div> */}
    <div className="flex w-full flex-col md:items-center items-start justify-center p-4 md:mt-[80px] mt-[58px]">
        <h1 className='text-5xl font-bold text text-gray-800 dark:text-gray-50'>What If You Could Plan a Whole</h1>
        <div className="">
          <h1 className='text-5xl font-bold text text-gray-800 dark:text-gray-50'> Term in Minutes?</h1>
          <div className="relative smx:right-0 sm:right-[-180px]">
            <Image src={line3} alt='line' width={200} height={15}></Image>
          </div>
        </div>
        <p className='text-md font-normal text-gray-600 dark:text-gray-200 mt-[8px]'>Create customized schemes of work tailored to your teaching schedule in just a few clicks.</p>
    </div>

    <div className="w-full flex items-center justify-center mt-[24px]">
 
        <div className="relative bottom-[20px] left-[-10px]">
            <Image src={arrow4} alt='line' width={83} height={64} className='dark:brightness-150'></Image>
        </div>
          <div className="">
        <Button size="lg" className='text-white bg-[#007AFF] rounded-none'>Get started</Button>
        </div>
        <div className="relative bottom-[30px] left-[-5px]">
            <Image src={glitter5} alt='line' width={33} height={33} className='dark:brightness-150'></Image>
        </div>
    </div>

    <div className="mt-[24px] p-[24px]">
        <Image src={homevideoimage} alt='image' className='rounded-sm brightness-75'></Image>
    </div>
    {/* <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute top-0 z-[-100] border border-green-500"></div> */}

  </div>

  )
}



export default HomeSection
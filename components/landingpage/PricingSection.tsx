import React from 'react'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { smiley1, sparkle2, underline3 } from '@/public/images'
const PricingSection = () => {
  return (
    <section className='space-y-4 mt-[24px] relative' id='pricing'>
      <div className="absolute top-[100px] left-[20px] md:left-[40px] lg:left-[60px]">
            <Image src={smiley1} alt='underline' width={40} height={40} className='dark:brightness-125'></Image>
      </div>
      <div className="absolute bottom-[50px] right-[20px] md:right-[40px] lg:right-[60px]">
            <Image src={sparkle2} alt='underline' width={40} height={40} className='dark:brightness-125'></Image>
      </div>
      <div className="w-full items-center justify-center flex text-sm text-[#1582FF] font-bold">
        <h1>pricing</h1>
      </div>
      <div className="w-full flex justify-center items-center space-y-4 flex-col z-[200]">
        <h1 className='text-4xl text-center font-bold bg-[linear-gradient(to_right,#212121,#0077FF)] dark:bg-[linear-gradient(to_right,#ffffff,#58A6FF)] bg-clip-text text-transparent'>Affordable, Pay-As-You-Go Pricing</h1>
        <div className="relative bottom-[15px] right-[0px] md:right-[-240px]">
            <Image src={underline3} alt='underline' width={150} height={20}></Image>
        </div>
        <p className='text-gray-600 dark:text-gray-100 text-md'>Simple, Flexible, and Budget-Friendly.</p>
      </div>
      <div className="flex items-center justify-center ">
        <div className="border bg-background/35 dark:bg-background/35 border-gray-300 dark:border-gray-500 shadow-sm p-8 rounded-sm space-y-4 max-w-[400px]">
          <div className="p-2 w-full flex items-center justify-end ">
            <div className="bg-gray-600 p-[8px] rounded-md">
              <p className='text-xs text-white '>All in one plan</p>
            </div>
          </div>
          <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100'>KSh 25 <span className='text-base font-normal text-gray-600 dark:text-gray-200'>per generated scheme</span></h1>
          <p className='text-sm text-gray-600 dark:text-gray-200'>With JengaScheme, you only pay for what you use. Generate complete, tailored schemes of work whenever you need them—quick, simple, and affordable.</p>
          <div className="space-y-2 ">
            <p className='text-gray-600 dark:text-gray-200'><Check className='dark:text-gray-200 inline-flex items-center w-[24px] h-[24px] text-gray-600'/>Generate a complete, customized scheme of work in minutes.</p>
            <p className='text-gray-600 dark:text-gray-200'><Check className=' dark:text-gray-200 w-[24px] h-[24px] text-gray-600 inline-flex items-center'/>No hidden fees, no commitments—pay per scheme.</p>
            <p className='text-gray-600 dark:text-gray-200'><Check className=' dark:text-gray-200 w-[24px] h-[24px] text-gray-600 inline-flex items-center'/>Perfect for teachers who value flexibility and simplicity.</p>
          </div>
          <Button className='w-full dark:text-gray-100 rounded-none bg-[#007AFF]'>Get started</Button> 
        </div>
      </div>

    </section>
  )
}

export default PricingSection
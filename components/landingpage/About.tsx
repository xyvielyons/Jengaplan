import { africanStudentStudying, mic1 } from '@/public/images'
import React from 'react'
import Image from 'next/image'
const About = () => {
  return (
    <section className='flex flex-col md:flex-row-reverse mt-[16px]'>
        <div className="space-y-2 p-2">
            <div className="flex space-x-[4px] items-center">
                <h1 className='text-2xl font-bold text-gray-800'>About</h1>
                <Image src={mic1} alt='mic' width={32} height={32}></Image>
            </div>
            <div className="">
                <h1 className='text-4xl font-bold bg-[linear-gradient(to_right,#212121,#1582FF)] dark:bg-[linear-gradient(to_right,#ffffff,#1582FF)] bg-clip-text text-transparent'>“Redefining Lesson Planning for Teachers”</h1>
            </div>
            <div className="space-y-2 p-2">
                <p>JengaScheme is a simple yet powerful scheme of work generator designed to save teachers time and effort. With just a few clicks, you can create customized schemes of work tailored to your teaching schedule.</p>
                <p>Built by educators for educators, JengaScheme takes the hassle out of lesson planning, so you can focus on what truly matters—teaching and inspiring students.</p>
            </div>
        </div>
        <div className="p-4 flex items-center">
            <Image src={africanStudentStudying} alt="africanstudent" width={1200} height={768} className='rounded-sm'></Image>
        </div>
    </section>
  )
}

export default About
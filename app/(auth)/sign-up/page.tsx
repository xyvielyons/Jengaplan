import React from 'react'
import Image from 'next/image'
import SignUpForm from '@/components/forms/SignUpForm'
import Link from 'next/link'
import Socials from '@/components/global/Socials'
// import { assets } from '@/public/assets'
const page = () => {
  return (
    <div className="flex flex-col md:flex-row mt-[32px] p-4 relative">
            <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute right-0 transform translate-x-[55%] top-[-200px] hidden md:block"></div>

      {/* Left Section */}
      <div className="pt-6 pb-2 px-4 space-y-[28px] md:w-1/2 md:p-8 lg:p-16">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100">Create account</h1>
          <p className="text-gray-600 dark:text-slate-300">
            Effortless Member Management Starts Here – Create Your Account Today!
          </p>
          <SignUpForm />
        </div>
        <div className="">
          <Socials></Socials>
        </div>
        <div className="">
          <span className='text-sm text-gray-600 dark:text-slate-300'>Have an account? <Link href="/sign-in" className='text-gray-800 dark:text-slate-50 font-semibold hover:text-gray-500 active:text-gray-500'>Login</Link></span>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex items-center p-[8px]">
        <div className="w-full max-w-[600px] p-[4px] relative rounded-sm ">
          <Image
            src="https://drive.google.com/uc?export=view&id=1_GBoP8UB_oRGFT-ZmrfktlUtQ5iH5s2Q"
            alt="sign up image"
            layout="intrinsic"
            width={1800}
            height={1800}
            className="object-cover rounded-sm"
          />
          <div className="text-white absolute bottom-[50px] p-[20px] bg-black/80">
            <h1 className='text-[20px] font-bold'>JengaScheme</h1>
            <p className='text-[16px] wrap '>Built to Save Teachers Time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

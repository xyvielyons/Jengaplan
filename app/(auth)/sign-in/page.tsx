import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SignInForm from '@/components/forms/SignInForm'
import Socials from '@/components/global/Socials'
// import { assets } from '@/public/assets'
const page = () => {
  return (
    <div className="flex flex-col md:flex-row mt-[32px] p-4 relative ">
            <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute right-0 transform translate-x-[55%] top-[-200px] hidden md:block"></div>

      {/* Left Section */}
      <div className="pt-6 pb-2 px-4 space-y-[28px] md:w-1/2 md:p-8 lg:p-16">

        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100">Welcome Back!</h1>
          <p className="text-gray-600 dark:text-slate-300">
          Manage Your Memberships with Ease.
          </p>
          <div className="py-[16px]">
            <Socials></Socials>
          </div>
          <SignInForm />
        </div>
        
        <div className="">
          <span className='text-sm text-gray-600 dark:text-slate-300'>Dont have an account? <Link href="/sign-up" className='text-gray-800 dark:text-slate-50 font-semibold hover:text-gray-500 active:text-gray-500'>Register</Link></span>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex items-center p-[8px]">
        <div className="w-full max-w-[600px] p-[4px] relative rounded-sm ">
          <Image
            src="https://drive.google.com/uc?export=view&id=136me9g1mcmQa3yoNm9j7-oPiSPIN4A8S"
            alt="sign up image"
            layout="intrinsic"
            width={1800}
            height={1800}
            className="object-cover rounded-sm"
          />
          <div className="text-white absolute bottom-[50px] p-[20px] bg-black/80">
            <h1 className='text-[20px] font-bold'>JengaScheme</h1>
            <p className='text-[16px] wrap '>Your Partner in Effortless Lesson Planning</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

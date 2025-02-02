import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ForgetForm from '@/components/forms/ForgetForm'
import { reset } from '@/public/images'
const page = () => {
  return (
    <div className="flex flex-col md:flex-row mt-[32px] p-4 relative">
        <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute right-0 transform translate-x-[55%] top-[-200px] hidden md:block"></div>

      {/* Left Section */}
      <div className="pt-6 pb-2 px-4 space-y-[28px] md:w-1/2 md:p-8 lg:p-16">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Forgot password</h1>
          <p className="text-gray-600 dark:text-gray-300">
          Please input your email address
          </p>
          <ForgetForm />
        </div>
        <div className="">
          <span className='text-sm text-gray-600 dark:text-gray-300'>Dont have an account? <Link href="/sign-up" className='text-gray-800 font-semibold hover:text-gray-500 active:text-gray-500 dark:text-gray-50'>Register</Link></span>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-[16px]">
        <div className="w-full max-w-[600px] p-8  relative">
          <Image
            src="https://drive.google.com/uc?export=view&id=1hJne2MAJIXWeCB_d7z-Xg956B3OpJhAo"
            alt="reset image"
            layout="intrinsic"
            width={1000}
            height={1000}
            className="object-cover rounded-lg "
          />
          
        </div>
      </div>
    </div>
  )
}

export default page

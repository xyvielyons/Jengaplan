import Image from 'next/image'
import React from 'react'
import {auth} from '@/auth'
import { headers } from 'next/headers'
import AccountSettingsForm from '@/components/forms/AccountSettingsForm'
type Props = {}

const SettingsPage = async(props: Props) => {
  const session = await auth.api.getSession({
    headers:await headers()
  })
  return (
    <div className='h-full max-w-7xl mx-auto flex flex-col gap-2 p-4 space-y-2'>
      <div className="w-full space-y-2">
        <h1 className='text-[24px] font-bold text-gray-800 dark:text-gray-100'>Account Settings</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          Update your profile, preferences, and teaching details to make JengaScheme work perfectly for you.
        </p>
      </div>

      {/* ✅ Make image fit full width while maintaining aspect ratio */}
      <div className="relative">
        <div className="relative w-full h-[150px] md:h-[200px]">
          <Image 
            src="https://drive.google.com/uc?export=view&id=1ps4aOPwMCSRmWtlccTwhD3qeGD2hqwEE" 
            alt="Profile settings"
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg"
          />
        </div>
        <div className="absolute bottom-[-60px] left-8 w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
            <Image
            src={session?.user.image as string}
            alt="image"
            width={100}
            height={100}
            objectFit="cover" 
            className="rounded-lg"
            ></Image>
        </div>
        <div className="absolute bottom-[-50px] md:left-36 left-32">
            <p className='text-md font-bold'>{session?.user.name}</p>
            <p className='text-sm'>{session?.user.email}</p>
        </div>
      </div>

      <div className="pt-[80px] pb-[80px]">
        <AccountSettingsForm session={session}/>
      </div>

    </div>
  )
}

export default SettingsPage

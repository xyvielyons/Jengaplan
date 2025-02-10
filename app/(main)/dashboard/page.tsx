import { auth } from '@/auth'
import { headers } from 'next/headers'
import React from 'react'

type Props = {}

const page = async(props: Props) => {
  const session = await auth.api.getSession({
    headers:await headers()
  })

  return (
    <div className='h-full max-w-7xl mx-auto flex flex-col gap-2 p-4 space-y-2 '>
      <div className="w-full space-y-2">
        <h1 className='text-[24px] font-bold text-gray-800 dark:text-gray-100'>Hello 👋 {session?.user.name}</h1>
        <h1 className='text-[18px] font-bold text-gray-800 dark:text-gray-100'>Overview Dashboard</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
        Manage and generate your schemes of work effortlessly in one place.
        </p>
      </div>
    </div>
  )
}

export default page
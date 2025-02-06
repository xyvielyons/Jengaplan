import SchemeCard from '@/components/cards/SchemeCard'
import Steps from '@/components/cards/Steps'
import DashboardNav2 from '@/components/global/DashboardNav2'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

type Props = {}

const CreatePage = (props: Props) => {
  return (
    <div className='h-full max-w-7xl mx-auto flex flex-col gap-2 space-y-2'>
      <div className="w-full space-y-2 px-4">
        <h1 className='text-[24px] font-bold text-gray-800 dark:text-gray-100'>Create a Scheme of work</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
        Fill in your teaching details, and we’ll generate a customized scheme of work tailored to your schedule in seconds.
        </p>
      </div>
      <div className="px-4">
        <SchemeCard></SchemeCard>
      </div>
    </div>
  )
}

export default CreatePage
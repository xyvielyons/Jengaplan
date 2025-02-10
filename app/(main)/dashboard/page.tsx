import { BankInformation, getGeneratedPdfData } from '@/actions/queries'
import { auth } from '@/auth'
import DashboardCards from '@/components/cards/DashboardCards'
import WalletCards from '@/components/cards/WalletCards'
import { headers } from 'next/headers'
import React from 'react'

type Props = {}

const page = async(props: Props) => {
  const session = await auth.api.getSession({
    headers:await headers()
  })
  const myBankInformation = await BankInformation()
  const getPdfs = await getGeneratedPdfData({userId:session?.user.id})
  console.log(getPdfs)
  return (
    <div className='h-full max-w-7xl mx-auto flex flex-col gap-2 p-4 space-y-2 pb-[80px]'>
      <div className="w-full space-y-2">
        <h1 className='text-[24px] font-bold text-gray-800 dark:text-gray-100'>Hello 👋 {session?.user.name}</h1>
        <h1 className='text-[18px] font-bold text-gray-800 dark:text-gray-100'>Overview Dashboard</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
        Manage and generate your schemes of work effortlessly in one place.
        </p>
      </div>
      <div className="">
          <DashboardCards bankInfo={myBankInformation} pdfs={getPdfs}></DashboardCards>
      </div>
    </div>
  )
}

export default page
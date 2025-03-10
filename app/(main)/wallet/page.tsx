export const dynamic = "force-dynamic"; // Ensures it is not statically pre-rendered
import { BankInformation } from '@/actions/queries'
import { columns} from '@/components/Tables/Transactions/columns'
import { DataTable } from '@/components/Tables/Transactions/data-table'
import WalletCards from '@/components/cards/WalletCards'
import React from 'react'



const WalletPage = async() => {

  const myBankInformation:any = await BankInformation()
  
  const getTransactions:any = myBankInformation?.transactions
  return (
    <div className='h-full max-w-7xl mx-auto flex flex-col gap-2 p-4 space-y-2 '>
      <div className="w-full space-y-2">
        <h1 className='text-[24px] font-bold text-gray-800 dark:text-gray-100'>Wallet</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
        Easily track your balance{`,`} top up{`,`} and pay for generated schemes. Stay in control of your spending with a simple and secure wallet system.
        </p>
      </div>
      <div className="">
        <WalletCards bankInfo={myBankInformation}></WalletCards>
      </div>
      <div className="bg-white dark:bg-transparent pb-[80px]">
        <DataTable columns={columns} data={getTransactions} ></DataTable>
      </div>
    </div>
  )
}

export default WalletPage
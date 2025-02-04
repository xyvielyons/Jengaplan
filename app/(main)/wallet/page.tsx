import { BankInformation } from '@/actions/queries'
import WalletCards from '@/components/cards/WalletCards'
import React from 'react'

type Props = {}

const WalletPage = async(props: Props) => {

  // const submit = async()=>{
  //   const initiatePayment = await InitiatePayment({
  //     price:"1.00",
  //     phoneNumber:"0728440683",
  //     name:"xyvie"
  //   })
  //   console.log(initiatePayment)
  // }
  const myBankInformation = await BankInformation()
  console.log(myBankInformation)
  
  return (
    <div className='h-full max-w-7xl mx-auto flex flex-col gap-2 p-4 space-y-2'>
      <div className="w-full space-y-2">
        <h1 className='text-[24px] font-bold text-gray-800 dark:text-gray-100'>Wallet</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
        Easily track your balance, top up, and pay for generated schemes. Stay in control of your spending with a simple and secure wallet system.
        </p>
      </div>
      <div className="">
        <WalletCards></WalletCards>
      </div>
    </div>
  )
}

export default WalletPage
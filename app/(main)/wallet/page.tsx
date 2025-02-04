'use client'
import { InitiatePayment, RegisterPesapalIPN } from '@/actions/pesapalpayments'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const WalletPage = (props: Props) => {
  // const registerIpn = await RegisterPesapalIPN()
  // console.log(registerIpn)

  const submit = async()=>{
    const initiatePayment = await InitiatePayment({
      price:"1.00",
      phoneNumber:"0728440683",
      name:"xyvie"
    })
    console.log(initiatePayment)
  }
  
  
  return (
    <div>
      <Button onClick={submit}>Click</Button>
    </div>
  )
}

export default WalletPage
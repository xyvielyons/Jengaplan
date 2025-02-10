import React from 'react'
import ConfirmedLottie from '@/components/global/ConfirmedLottie'
import { TransactionStatus } from '@/actions/pesapalpayments';

type Props = {
  searchParams: any
  
}

const page = async({searchParams}: Props) => {
  // const userId = (await params).id
  const OrderTrackingId:any = await searchParams.OrderTrackingId?.toString()
  // const OrderMerchantReference = await searchParams.OrderMerchantReference

  const GetTransactionStatus:any = await TransactionStatus(OrderTrackingId) 



  return (
    <div>
      <ConfirmedLottie data={GetTransactionStatus.data}></ConfirmedLottie>
    </div>
  )
}

export default page
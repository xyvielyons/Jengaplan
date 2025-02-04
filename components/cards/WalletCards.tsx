'use client'
import { getBankInformationTypes } from '@/lib/types'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Wallet,BadgeDollarSign } from 'lucide-react';
import { Button } from '@heroui/react';
import {
  useDisclosure,
} from "@heroui/react";
import TopUpForm from '../forms/TopUpForm';
type Props = {
  bankInfo:getBankInformationTypes
}

const WalletCards = ({bankInfo}: Props) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div>
      <div className="gap-2 flex flex-col md:flex-row">
        <Card className='dark:bg-background w-full'>
          <CardHeader>
            <CardTitle className='flex items-center gap-4'>
              <Wallet size={24} className='text-gray-800 dark:text-gray-300'/>
              <h1 className='text-sm text-gray-800 dark:text-gray-300'>Total balance</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <h1 className='text-[32px] font-bold text-gray-800 dark:text-gray-200'>{`Ksh ${bankInfo?.amount}`}<span className='text-gray-500 dark:text-gray-400'>.00</span></h1>
            <Button onPress={onOpen} className='bg-blue-600 text-white w-full' radius='sm'>Top up</Button>
          </CardContent>
        </Card>

        <Card className='dark:bg-background w-full hidden md:block'>
          <CardHeader>
            <CardTitle className='flex items-center gap-4'>
              <BadgeDollarSign size={24} className='text-gray-800 dark:text-gray-300'/>
              <h1 className='text-sm text-gray-800 dark:text-gray-300'>Total transactions done</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <h1 className='text-[32px] font-bold text-gray-800 dark:text-gray-200 flex items-center gap-4'>{`${bankInfo?.transactions.length}`}<span className='text-gray-500 dark:text-gray-400 text-[20px] font-medium'> Transactions</span></h1>
          </CardContent>
        </Card>
      </div>
      <TopUpForm isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}></TopUpForm>

    </div>
  )
}

export default WalletCards
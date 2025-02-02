'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {Button} from "@heroui/react";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { logodark, logolight } from '@/public/images';

 const EmailVerifiedCard = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <div className="">
            <Card className=''>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-center dark:text-gray-600 flex-col space-y-4">
                        
                    <div className="w-[200px] flex items-center justify-center">
                        <Image src={logolight} alt="" width={100} height={100} className='dark:brightness-150'></Image>
                    </div>
                    {error == "token_expired" ? (
                            <p className='dark:text-white'>Email Not Verified</p>
                        ):(
                            <p>Email Verified</p>
                        )}
                    </CardTitle>
                    <CardDescription className='flex items-center justify-center text-center'>
                        {error == "token_expired" ? (
                            <p>Your verification email token has expired</p>
                        ):(
                            <p>Your email has been successfully verified.</p>
                        )}
                    </CardDescription>
                </CardHeader>
  
                <CardFooter>
                    <div className="w-full">
                        <Button onClick={()=>router.push('/sign-in')} startContent={<FaArrowRight />} className='bg-[#007AFF] text-slate-50 w-full' radius="sm">Go to Home</Button>
                    </div>
                </CardFooter>
            </Card>

        </div>
    
    </div>
  )
}

export default EmailVerifiedCard
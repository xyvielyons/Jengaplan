'use client'
import React, { useState } from 'react'
import { Button } from '@heroui/react';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from '@/auth-client';
import { useRouter } from 'next/navigation';
import { ErrorContext } from "@better-fetch/fetch";
import { useToast } from '@/hooks/use-toast';
const Socials = () => {
    const router = useRouter()
    const {toast} = useToast();
    const [pendingGoogle, setPendingGoogle] = useState(false);

    const handleSignInWithGoogle = async()=>{
        await authClient.signIn.social(
            {
                provider:"google"
            },
            {
                onRequest:()=>{
                    setPendingGoogle(true)
                },
                onSuccess:async()=>{
                    router.push('/');
                    router.refresh();
                    toast({
						title: "Signed in with google",
						variant: "default"
					});
                },
                onError: (ctx: ErrorContext) => {
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
						variant: "destructive",
					});
				},
            }
        )
        setPendingGoogle(false)
    }
  return (
    <div className='flex flex-col gap-2'>
        
        <div className="flex-row flex gap-4">
            <div className="w-full">
                <Button isLoading={pendingGoogle} onClick={handleSignInWithGoogle} className='w-full bg-gray-200 dark:text-gray-800' startContent={<FcGoogle className='w-[24px] h-[24px]' />} radius='sm'>Google</Button>
            </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
            <div className="w-full h-[1px] bg-slate-400"></div>
            <div className="text-gray-500">or</div>
            <div className="w-full h-[1px] bg-slate-400"></div>
        </div>
        
    </div>
  )
}

export default Socials
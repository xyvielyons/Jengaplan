'use client'
import Image from 'next/image'
import React,{useEffect, useState} from 'react'
import { logolight,logodark } from '@/public/images'
import { Moon, MoonIcon, Sun,Menu,X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button as But } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
type Props = {}
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const AuthNav = (props: Props) => {
  const { setTheme } = useTheme()
  const router = useRouter()
  
  return (
    <div className="bg-white/80 dark:bg-background/80 w-full ">
        <nav className='fixed bg-white/80 dark:bg-background/80 border border-b-slate-200 h-[56px] w-full flex items-center px-4 justify-between dark:border-b-gray-800 z-[100]'>
              <div className="flex space-x-2 ">
                <Link href="/">
                  <Image alt='logo' src={logolight} width={110} height={110} className='dark:brightness-[150]'></Image>
                </Link>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <div className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <But variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </But>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
              </div>
        </nav>
        

    </div>
    
  )
}

export default AuthNav
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
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
type Props = {
    children:React.ReactNode
}

const DashboardNav2 = ({children}: Props) => {
  const { setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  return (
        <div className='bg-white/80 dark:bg-background/95 border-b-1 border-b-slate-200 h-[50px] items-center px-4 justify-between dark:border-b-gray-800 w-full hidden md:block md:flex'>
              <div className="space-x-2 hidden md:block gap-2 items-center justify-center">
                
                  {children}
                
                <p className='dark:text-slate-400 text-sm text-gray-600 inline-flex'>{pathname}</p>
              </div>
              <div className="md:hidden space-x-2 flex items-center ">
                <Image src={logolight} alt='logo' width={100} height={100} className='dark:brightness-200'></Image>
                <p className='dark:text-slate-400 text-sm text-gray-600 hidden md:block'>{pathname}</p>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                
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
        
  )
}

export default DashboardNav2
'use client'
import Image from 'next/image'
import React,{useState} from 'react'
import { logolight,logodark } from '@/public/images'
import { Moon, MoonIcon, Sun,Menu,X } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
type Props = {}

const Navbar = (props: Props) => {
  const { setTheme } = useTheme()
  const [showNav, setShowNav] = useState<boolean>(false)
  console.log(showNav)
  return (
    <div className="z-100 bg-white/80 dark:bg-background/50">
        <nav className='border border-b-slate-200 h-[56px] w-full flex items-center px-4 justify-between dark:border-b-gray-800'>
              <div className="flex space-x-2">
                <div className="md:hidden" onClick={()=>setShowNav(!showNav)}>
                  {showNav ? (
                    <X className='w-[24px] h-[24px] text-gray-600 dark:text-gray-100'/>
                  ):(
                    <Menu className='w-[24px] h-[24px] text-gray-600 dark:text-gray-100'/>
                  )}
                </div>
                <Image alt='logo' src={logolight} width={110} height={110} className='dark:brightness-[150]'></Image>
              </div>
              <div className="hidden md:block">
                <ul className='flex space-x-2 items-center'>
                  <li>
                    <Link href='#home' className='text-[16px] font-bold text-gray-800 dark:text-gray-100'>Home</Link>
                  </li>
                  <li>
                    <Link href='#about' className='text-[16px] font-medium text-gray-600 dark:text-gray-300'>About</Link>
                  </li>
                  <li>
                    <Link href='#pricing' className='text-[16px] font-medium text-gray-600 dark:text-gray-300'>Pricing</Link>
                  </li>
                  <li>
                    <Link href='#team' className='text-[16px] font-medium text-gray-600 dark:text-gray-300'>Team</Link>
                  </li>
                  <li>
                    <Link href='#testimonials' className='text-[16px] font-medium text-gray-600 dark:text-gray-300'>Testimonials</Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <div className="space-x-2 flex">
                  <Button variant="outline" size="default" className='bg-white text-black md:bg-transparent dark:md:text-white'>Sign-up</Button>
                  <Button className='hidden md:block dark:text-white bg-[#007AFF] rounded-none' size="default" >Login</Button>
                </div>
                <div className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
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
        <div className={`${showNav ? 'left-[0px]':'left-[-500px]'} flex w-[250px] border-[1px] dark:border-r-slate-800 border-r-slate-300 absolute top-0 h-screen bg-white dark:bg-background/90 transition-all duration-300 ease-in-out md:hidden flex-col z-[200]`}>
          <div className="w-full p-8 flex justify-end" onClick={()=>setShowNav(!showNav)}>
            <X className='w-[24px] h-[24px] text-gray-700 dark:text-gray-300'></X>
          </div>
          <div className="">
                <ul className='flex space-y-8 flex-col items-start p-8'>
                  <li>
                    <Link href='#home' className='text-[16px] font-bold text-gray-600 dark:text-gray-100'>Home</Link>
                  </li>
                  <li>
                    <Link href='#about' className='text-[16px] font-medium text-gray-600 dark:text-gray-400'>About</Link>
                  </li>
                  <li>
                    <Link href='#pricing' className='text-[16px] font-medium text-gray-600 dark:text-gray-400'>Pricing</Link>
                  </li>
                  <li>
                    <Link href='#team' className='text-[16px] font-medium text-gray-600 dark:text-gray-400'>Team</Link>
                  </li>
                  <li>
                    <Link href='#testimonials' className='text-[16px] font-medium text-gray-600 dark:text-gray-400'>Testimonials</Link>
                  </li>
                </ul>
          </div>
        </div>

    </div>
    
  )
}

export default Navbar
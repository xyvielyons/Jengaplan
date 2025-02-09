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
import { usePathname } from 'next/navigation'
import { BankInformation } from '@/actions/queries'
import { useToast } from '@/hooks/use-toast'
import { useAppSelector } from '@/hooks/hooks'
type Props = {
    children:React.ReactNode
}

const DashboardNav = ({children}: Props) => {
  const { setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [bankAmount, setBankAmount] = useState<number>(0)
  const {toast} = useToast()
  const formData = useAppSelector((state)=>state.schemes.formData)
  useEffect(()=>{
    const fetchData = async()=>{
      const bankInformation = await BankInformation()
      if(!bankInformation){
        return toast({
          title:"Something went wrong",
          description:"Cannot access bank information",
          variant:"destructive"
        })
      }
      setBankAmount(bankInformation.amount)
    }
    fetchData()
  },[FormData])

  return (
    
        <nav className='fixed top-0 left-0 right-0 z-10 flex h-16 items-center justify-between gap-2 border-b bg-background/90 px-4'>
              <div className="space-x-2 hidden md:block gap-2 items-center justify-center">
                
                  {children}
                
                <p className='dark:text-slate-400 text-sm text-gray-600 inline-flex'>{pathname}</p>
              </div>
              <div className="md:hidden space-x-2 flex items-center ">
                <Image src={logolight} alt='logo' width={100} height={100} className='dark:brightness-200'></Image>
                <p className='dark:text-slate-400 text-sm text-gray-600 '>{pathname}</p>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                  <div className="mr-2 flex items-center justify-center border p-2 text-sm rounded-sm text-gray-700 cursor-pointer dark:text-gray-300 dark:border-gray-700" onClick={()=>router.push('/wallet')}>
                    {`Ksh ${bankAmount}`}
                  </div>
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
        </nav>
    
        
        
  )
}

export default DashboardNav
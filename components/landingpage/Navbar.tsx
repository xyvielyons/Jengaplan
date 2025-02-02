'use client'
import Image from 'next/image'
import React,{useEffect, useState} from 'react'
import { logolight,logodark } from '@/public/images'
import { Moon, MoonIcon, Sun,Menu,X } from "lucide-react"
import { useTheme } from "next-themes"
import {Link} from 'react-scroll';
import { Button } from '@heroui/react'
import { Button as But } from '../ui/button'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useScroll,useMotionValueEvent } from "framer-motion";
type Props = {}

const Navbar = (props: Props) => {
  const { setTheme } = useTheme()
  const [showNav, setShowNav] = useState<boolean>(false)
  const [Nav, setNav] = useState("home")
  const [scroll, setScroll] = useState<any>()
  const { scrollY } = useScroll();
  const router = useRouter()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScroll(latest)
  });
  useEffect(() => {
    if(scroll>0){
      setNav("home")
      if(scroll>670){
        setNav("about")
        if(scroll>1000){
          setNav("pricing")
          if(scroll>1800){
            setNav("team")
            if(scroll>2200){
              setNav("testimonials")
            }
          }
        }
      }
    }
  }, [scroll])
  
  return (
    <div className="z-100 bg-white/80 dark:bg-background/80 w-full ">
        <nav className=' fixed bg-white/80 dark:bg-background/80 border border-b-slate-200 h-[56px] w-full flex items-center px-4 justify-between dark:border-b-gray-800 z-[1000]'>
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
                    <Link to="home" spy={true} smooth={true} offset={-60} duration={500} href='#home' className={`${Nav === "home"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>setNav("home")}>Home</Link>
                  </li>
                  <li>
                    <Link to="about" spy={true} smooth={true} offset={-60} duration={500} href='#about' className={`${Nav === "about"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>setNav("about")}>About</Link>
                  </li>
                  <li>
                    <Link to="pricing" spy={true} smooth={true} offset={-60} duration={500} href='#pricing' className={`${Nav === "pricing"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>setNav("pricing")}>Pricing</Link>
                  </li>
                  <li>
                    <Link to="team" spy={true} smooth={true} offset={-60} duration={500} href='#team' className={`${Nav === "team"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>setNav("team")}>Team</Link>
                  </li>
                  <li>
                    <Link to="testimonials" spy={true} smooth={true} offset={-60} duration={500} href='#testimonials' className={`${Nav === "testimonials"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>setNav("testimonials")}>Testimonials</Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-row space-x-2 items-center">
                <div className="space-x-2 flex">
                  <Button variant="bordered" className='border-[1.5px]' radius='none' onPress={()=>router.push('/sign-up')}>Sign-up</Button>
                  <Button className='hidden md:block text-white bg-[#007AFF] rounded-none' onPress={()=>router.push('/sign-in')}>Login</Button>
                </div>
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
        <div className={`${showNav ? 'translate-x-[0%]':'translate-x-[-100%]'} flex w-[250px] border-[1px] dark:border-r-slate-800 border-r-slate-300 transform top-0 h-screen bg-white dark:bg-background/90 transition-all duration-300 ease-in-out md:hidden flex-col z-[200] fixed`}>
          <div className="w-full p-8 flex justify-end" onClick={()=>setShowNav(!showNav)}>
            <X className='hidden w-[24px] h-[24px] text-gray-700 dark:text-gray-300'></X>
          </div>
          <div className="">
                <ul className='flex space-y-8 flex-col items-start p-8'>
                <li>
                    <Link to="home" spy={true} smooth={true} offset={-60} duration={500} href='#home' className={`${Nav === "home"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>{
                      setNav("home")
                      setShowNav(!showNav)
                      }}>Home</Link>
                  </li>
                  <li>
                    <Link to="about" spy={true} smooth={true} offset={-60} duration={500} href='#about' className={`${Nav === "about"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>{
                      setNav("about")
                      setShowNav(!showNav)
                      }}>About</Link>
                  </li>
                  <li>
                    <Link to="pricing" spy={true} smooth={true} offset={-60} duration={500} href='#pricing' className={`${Nav === "pricing"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>{
                      setNav("pricing")
                      setShowNav(!showNav)
                      }}>Pricing</Link>
                  </li>
                  <li>
                    <Link to="team" spy={true} smooth={true} offset={-60} duration={500} href='#team' className={`${Nav === "team"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>{
                      setNav("team")
                      setShowNav(!showNav)
                      }}>Team</Link>
                  </li>
                  <li>
                    <Link to="testimonials" spy={true} smooth={true} offset={-60} duration={500} href='#testimonials' className={`${Nav === "testimonials"?"text-gray-800 font-bold":""} text-[16px] font-regular text-gray-600 dark:text-gray-100`} onClick={()=>{
                      setNav("testimonials")
                      setShowNav(!showNav)
                      }}>Testimonials</Link>
                  </li>
                </ul>
          </div>
        </div>

    </div>
    
  )
}

export default Navbar
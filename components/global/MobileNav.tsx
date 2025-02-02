'use client'
import React from 'react'
import { Plus,User } from 'lucide-react';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard,Wallet,Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
type Props = {}

const MobileNav = (props: Props) => {
    const router = useRouter()
    const pathname = usePathname()
  return (
    <nav className="md:hidden w-full h-[60px] border border-t-slate-200 dark:border-t-gray-800 fixed bottom-0 flex items-center justify-between px-[4px] bg-white dark:bg-gray-900">
    {/* Dashboard Button */}
    <Button variant="light" className="flex-1" onPress={() => router.push('/dashboard')}>
        <div className="flex flex-col items-center justify-center space-y-[2px]">
            <div className={`flex items-center justify-center flex-col ${pathname === '/dashboard' ? 'dark:text-white text-gray-800 font-bold' : 'dark:text-gray-500 text-gray-500'}`}>
                <LayoutDashboard size={18} />
                <p className="text-xs">Dash</p>
            </div>
            <div className={`w-full h-[4px] bg-blue-600 rounded-full ${pathname === '/dashboard' ? "block":"hidden"}`}></div>
        </div>
        
    </Button>

    {/* Wallet Button */}
    <Button variant="light" className="flex-1" onPress={() => router.push('/wallet')}>
        <div className="flex flex-col items-center justify-center space-y-[2px]">
            <div className={`flex items-center justify-center flex-col ${pathname === '/wallet' ? 'dark:text-white text-gray-800 font-bold' : 'dark:text-gray-500 text-gray-500'}`}>
                <Wallet size={18} />
                <p className="text-xs">Wallet</p>
            </div>
            <div className={`w-full h-[4px] bg-blue-600 rounded-full ${pathname === '/wallet' ? "block":"hidden"}`}></div>
        </div>
    </Button>

    {/* Spacer div to maintain alignment */}
    <div className="w-[60px]"></div>

    {/* Settings Button */}
    <Button variant="light" className="flex-1" onPress={() => router.push('/settings')}>
        <div className="flex flex-col items-center justify-center space-y-[2px]">
            <div className={`flex items-center justify-center flex-col ${pathname === '/settings' ? 'dark:text-white text-gray-800 font-bold' : 'dark:text-gray-500 text-gray-500'}`}>
                <Settings size={18} />
                <p className="text-xs">Settings</p>
            </div>
            <div className={`w-full h-[4px] bg-blue-600 rounded-full ${pathname === '/settings' ? "block":"hidden"}`}></div>

        </div>
        
    </Button>

    {/* Profile Button (or another one) */}
    <Button variant="light" className="flex-1" onPress={() => router.push('/profile')}>
        <div className={`flex items-center justify-center flex-col ${pathname === '/profile' ? 'text-white' : 'text-gray-500'}`}>
            <User size={18} />
            <p className="text-xs">Profile</p>
        </div>
    </Button>

    {/* Floating Create Button */}
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <div onClick={() => router.push('/create')} className={`rounded-full h-[50px] w-[50px] shadow-lg bg-blue-600 flex items-center justify-center active:bg-blue-400 ${pathname === '/create'?'border-4 dark:border-white border-black':''}`}>
            <Plus size={26} className="text-white" />
        </div>
    </div>
</nav>


  )
}

export default MobileNav
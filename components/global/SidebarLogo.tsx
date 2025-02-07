import React from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { logo } from '@/public/images'
import Image from 'next/image'

const SidebarLogo = () => {
  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton
            size="lg"
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-full'
            >
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Image src={logo} alt="logo" width={100} height={100} className='object-cover p-[2px] brightness-50 dark:brightness-100' layout="intrinsic"></Image>
                </div>
                <div className="">
                    <h1 className='text-lg font-bold'>JengaScheme</h1>
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default SidebarLogo
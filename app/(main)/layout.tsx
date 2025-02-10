import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/global/app-sidebar'
import DashboardNav from '@/components/global/DashboardNav'
import MobileNav from '@/components/global/MobileNav'



type Props = {
    children:React.ReactNode
}

const MainRootLayout = async({children}: Props) => {

  return (

    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <DashboardNav>
          <SidebarTrigger></SidebarTrigger>
        </DashboardNav>
        <div className="pt-[72px]">
        {children}
        </div>
        <MobileNav></MobileNav>
      </main>
    </SidebarProvider>
  )
}

export default MainRootLayout
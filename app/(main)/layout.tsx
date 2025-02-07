import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/global/app-sidebar'
import DashboardNav from '@/components/global/DashboardNav'
import MobileNav from '@/components/global/MobileNav'
import { RegisterPesapalIPN } from '@/actions/pesapalpayments'
import { getData, getUniqueTopics } from '@/actions/testing'


type Props = {
    children:React.ReactNode
}

const MainRootLayout = async({children}: Props) => {
//  const data = await getData('form1mathematics')
//  const topics = await getUniqueTopics(data)
//  console.log(topics)
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
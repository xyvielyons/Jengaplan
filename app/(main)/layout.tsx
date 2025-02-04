import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/global/app-sidebar'
import DashboardNav from '@/components/global/DashboardNav'
import MobileNav from '@/components/global/MobileNav'
import { authorization, createTransaction } from '@/actions/pesapalpayments'
import { auth } from '@/auth'
import { headers } from 'next/headers'

type Props = {
    children:React.ReactNode
}

const MainRootLayout = async({children}: Props) => {
  // const session = await auth.api.getSession({
  //   headers:await headers()
  // })
  // console.log("session data",session)
  // console.log(await createTransaction())
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full flex flex-col justify-between'>
        <DashboardNav>
          <SidebarTrigger></SidebarTrigger>
        </DashboardNav>
        <div className="h-full w-full ">
        {children}
        </div>
        <MobileNav></MobileNav>
      </main>
    </SidebarProvider>
  )
}

export default MainRootLayout
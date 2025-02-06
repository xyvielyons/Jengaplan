import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/global/app-sidebar'
import DashboardNav from '@/components/global/DashboardNav'
import MobileNav from '@/components/global/MobileNav'
import { RegisterPesapalIPN } from '@/actions/pesapalpayments'


type Props = {
    children:React.ReactNode
}

const MainRootLayout = async({children}: Props) => {
  // const session = await auth.api.getSession({
  //   headers:await headers()
  // })
  // console.log("session data",session)
  // console.log(await createTransaction())
  // const registerIpn = await RegisterPesapalIPN()
  // console.log(registerIpn)
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
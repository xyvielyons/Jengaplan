import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/global/app-sidebar'

type Props = {
    children:React.ReactNode
}

const MainRootLayout = ({children}: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <nav className="w-full h-[40px] bg-gray-600 flex items-center ">
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
        </nav>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default MainRootLayout
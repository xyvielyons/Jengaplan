'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DashboardItems } from "@/constants"
import SidebarLogo from "./SidebarLogo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import MySidebarFooter from "./SideBarFooter"
import { authClient } from "@/auth-client"
export function AppSidebar() {
    const pathname = usePathname()
    const [mypathname, setPathname] = useState<any>()
    const {data:session}:any = authClient.useSession()

    useEffect(()=>{
        setPathname(pathname)
    },[pathname])
    
    return (
        <Sidebar collapsible="icon">
        <SidebarHeader className="mt-[80px]">
            <SidebarLogo></SidebarLogo>
        </SidebarHeader>
        <SidebarContent> 
            <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {DashboardItems.map((item) => (
                    <SidebarMenuItem key={item.title} className="relative flex items-center justify-center">
                    <div className={`absolute left-[-4] top-0 h-full bg-[#007AFF] w-[4px]  ${mypathname == item.url ? "block" : "hidden"}`}></div>
                    <SidebarMenuButton asChild size="lg">
                      <Link href={item.url} className=" flex items-center gap-2">
                        <div className={` text-gray-600 ${mypathname == item.url ? "dark:text-slate-50 text-gray-800" : ""}`}>
                          <item.icon />
                        </div>
                        <span className={` text-gray-600 ${mypathname == item.url ? "dark:text-slate-50 text-gray-800 font-bold" : ""}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <MySidebarFooter
            name={session?.user.name as string}
            email={session?.user.email as string}
            avatar={session?.user.image}
            type={session?.user?.role as string}
            ></MySidebarFooter>
        </SidebarFooter>
        </Sidebar>
    )
}

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
    const {data:session} = authClient.useSession()

    useEffect(()=>{
        setPathname(pathname)
    },[pathname])
    
    return (
        <Sidebar collapsible="icon">
        <SidebarHeader className="mb-[24px]">
            <SidebarLogo></SidebarLogo>
        </SidebarHeader>
        <SidebarContent> 
            <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {DashboardItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="lg" >
                        <Link href={item.url} className="mb-2">
                            <div className={`h-full bg-[#007AFF] w-[2px] ${mypathname==item.url ? "block":"hidden"}`}></div>
                            <div className={`dark:text-gray-600 ${mypathname== item.url ? "dark:text-slate-50":""}`}>
                                <item.icon />
                            </div>
                            <span className={`dark:text-gray-600 ${mypathname== item.url ? "dark:text-slate-50":""}`}>{item.title}</span>
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

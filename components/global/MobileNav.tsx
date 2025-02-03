'use client'
import React, { useState } from 'react'
import { LogOut, Plus,User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard,Wallet,Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react"
  import { authClient } from "@/auth-client"

type Props = {}

const MobileNav = (props: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const {data:session} = authClient.useSession();
    const [pending, setPending] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    //we call the handlesignout function
	const handleSignOut = async () => {
		try {
		//set pending to true
			setPending(true);
			//we call the authClient.signout function
			await authClient.signOut({
				fetchOptions: {
				//we listen to the onSuccess event
					onSuccess: () => {
					//if Success we route the user to the sign-in page
						router.push("/sign-in");
						router.refresh();
					},
				},
			});
		} catch (error) {
		//here we throw an errro
			console.error("Error signing out:", error);
		} finally {
		//when it finishes we set is pending to false
			setPending(false);
		}
	};
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
    <div className="w-[25px]"></div>

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

    <div className="flex-1 w-full">
        <DropdownMenu >
            <DropdownMenuTrigger className='w-full'>
                <div className="flex items-center justify-center flex-col">
                    <Avatar className="h-6 w-6 rounded-sm">
                        <AvatarImage src={session?.user.image as string} alt='profile' />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    {/* <p className='text-sm'>{session?.user.role}</p> */}
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onOpen}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>


    {/* Floating Create Button */}
    <div className="absolute -top-6 left-[53%] transform -translate-x-1/2">
        <div onClick={() => router.push('/create')} className={`rounded-full h-[50px] w-[50px] shadow-lg bg-blue-600 flex items-center justify-center active:bg-blue-400 ${pathname === '/create'?'border-4 dark:border-white border-black':''}`}>
            <Plus size={26} className="text-white" />
        </div>
    </div>
    <div className="">
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
                    <ModalBody>
                      <div className="">
                        <p>{session?.user.name} you sure you want to Logout?</p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" className="dark:text-white" onPress={handleSignOut} isLoading={pending}>
                        Logout {session?.user.name}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
        </div>
</nav>


  )
}

export default MobileNav
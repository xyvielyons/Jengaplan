import Navbar from '@/components/landingpage/Navbar'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const LandingPageRootLayout = ({children}: Props) => {
  return (
    <main className='max-w-7xl mx-auto h-full overflow-hidden dark:bg-black'>
      <Navbar></Navbar>
    {children}
    </main>
  )
}

export default LandingPageRootLayout
import AuthNav from '@/components/global/AuthNav'
import React from 'react'

type Props = {
    children:React.ReactNode
}

const LandingPageRootLayout = ({children}: Props) => {
  return (
    <main className='max-w-7xl mx-auto h-full overflow-hidden'>
      <AuthNav></AuthNav>
    {children}
    </main>
  )
}

export default LandingPageRootLayout
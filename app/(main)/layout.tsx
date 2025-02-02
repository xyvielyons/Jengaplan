import React from 'react'

type Props = {
    children:React.ReactNode
}

const MainRootLayout = ({children}: Props) => {
  return (
    <div>{children}</div>
  )
}

export default MainRootLayout
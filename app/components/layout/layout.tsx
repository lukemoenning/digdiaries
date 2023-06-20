import { ReactNode } from "react"
import Navbar from './navbar'
import Footer from './footer'

type LayoutProps = { 
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  )
}
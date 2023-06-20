import { ReactNode } from "react"
import styled from 'styled-components'
import Navbar from './navbar'
import Footer from './footer'

type LayoutProps = { 
  children?: ReactNode
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </LayoutWrapper>
  )
}
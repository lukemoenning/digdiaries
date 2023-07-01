import { ReactNode } from "react"
import styled from 'styled-components'
import Navbar from './Navbar'
import Footer from './Footer'

type LayoutProps = { 
  children?: ReactNode
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Navbar />
      <ContentWrapper>
        {children}
      </ContentWrapper>
      {/* <Footer /> */}
    </LayoutWrapper>
  )
}
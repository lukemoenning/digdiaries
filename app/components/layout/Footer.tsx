import styled from 'styled-components'
import { theme } from '@/app/libs/theme'

const FooterWrapper = styled.div`
  display: flex;  
  align-items: cneter;
  justify-content: space-evenly; 
  margin-top: auto;
  width: 100%;
  height: 8rem;
  background-color: ${theme.colors.lightBrown};
`;

const FooterLogoWrapper = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center;
  width: 200px;
`;

const FooterLogo = styled.div`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: ${theme.colors.darkBrown};
`;

const CopyRight = styled.p`
  color: ${theme.colors.black};
  font-size: ${theme.fontSize.xs};
  padding-left: 10px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterLogoWrapper>
        <FooterLogo />
        <CopyRight>© 2023</CopyRight>
      </FooterLogoWrapper>
      <FooterLinks>
        <p>link 1</p> 
        <p>link 2</p>
      </FooterLinks>
    </FooterWrapper>
  )
}
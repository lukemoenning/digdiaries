import Link from 'next/link'
import styled from 'styled-components'
import { theme } from '../../libs/theme'

const NavWrapper = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10rem;
  background-color: ${theme.colors.lightGreen};
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.large};
  text-decoration: none;
  margin: 30px;
`

export default function Navbar() { 
  return (
    <NavWrapper>
      <NavLinks>
        <NavLink href='/'>About</NavLink>
        <NavLink href='/blog'>Blog</NavLink>
        <NavLink href='/research'>Research</NavLink>
        <NavLink href='/gallery'>Gallery</NavLink>
        <NavLink href='/contact'>Contact</NavLink>
      </NavLinks>
    </NavWrapper>
  )
}
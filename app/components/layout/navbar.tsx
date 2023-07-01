import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@/app/libs/theme'
import NavLink from '@/app/components/layout/NavLink'
import type { navItem } from '@/app/libs/types';

const NavWrapper = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10rem;
  background-color: ${theme.colors.offWhite};
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavItems: navItem[] = [
  {name: 'About', href: '/'},
  {name: 'Blog', href: '/blog'},
  {name: 'Research', href: '/research'},
  {name: 'Gallery', href: '/gallery'},
  {name: 'Contact', href: '/contact'},
]

export default function Navbar() { 
  const [activeLink, setActiveLink] = useState<string>('About')

  return (
    <NavWrapper>
      <NavLinks>
        {NavItems.map((item) => (
          <NavLink 
            {...item} 
            key={item.name}
            isActive={item.name === activeLink}
            onClick={() => setActiveLink(item.name)}
          />
        ))}
      </NavLinks>
    </NavWrapper>
  )
}
import Link from 'next/link'
import styled from 'styled-components'
import { theme } from '@/app/libs/theme'
import type { navItem } from '@/app/libs/types';

const NavLinkWrapper = styled(Link)`
  font-size: ${theme.fontSize.lg};
  text-decoration: none;
  margin: 30px;
`

const ActiveName = styled.span`
  position: relative;
  color: ${theme.colors.lightGreen};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${theme.colors.lightGreen};
  }
`

const InactiveName = styled.span`
  color: ${theme.colors.black};
`

interface NavLinkProps extends navItem {
  isActive: boolean
  onClick: () => void
}

export default function NavLink({ name, href, isActive, onClick }: NavLinkProps ) {
  return (
    <NavLinkWrapper href={href} onClick={onClick}>
      {isActive 
        ? <ActiveName>{name}</ActiveName> 
        : <InactiveName>{name}</InactiveName>
      }
    </NavLinkWrapper>
  )
}
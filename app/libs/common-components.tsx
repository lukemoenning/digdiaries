import styled from 'styled-components';
import Link from 'next/link';
import { theme } from './theme';

export const BodyText = styled.p`
  color: ${theme.colors.black};
  font-size: ${theme.fontSize.medium};
`;

export const HeaderText = styled.p`
  color: ${theme.colors.black};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
`;

export const NormalPageWidth = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${theme.sizing.body.normal};
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;

export const NextLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.black};
`;
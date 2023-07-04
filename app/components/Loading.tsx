import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '@/app/libs/theme' 

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${theme.colors.offWhite};
`

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadingCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 8px solid ${theme.colors.lightGreen};
  border-top-color: ${theme.colors.offWhite};
  animation: ${spinAnimation} 1s infinite linear;
  margin-bottom: ${theme.padding.md};
`

const LoadingText = styled.span`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.lightBrown};
`

function Loading() {
  return (
    <LoadingContainer>
      <LoadingWrapper>
        <LoadingCircle />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    </LoadingContainer>
  )
}

export default Loading

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import { blogPost } from '@/app/libs/types'
import { theme } from '@/app/libs/theme'
import { BodyText, HeaderText, NextLink } from '@/app/libs/common-components';


const BlogPreivewWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
  padding: 20px;
  width: auto;
  height: 300px;
  padding: ${theme.padding.md};
  border-radius: 30px;
  background-color: ${theme.colors.offWhite};
  box-shadow: 0 0 10px 0 #B7C68B;

  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 5px solid ${theme.colors.offWhite};
    border-radius: 30px;
    z-index: -1;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    height: auto;
    width: 80%;
  }
`

const BlogInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 40%;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: 20px;
    width: 75%;
  }
`

const BlogImage = styled(Image)`
  padding: 30px;
  border-radius: 20px;
  background-color: ${theme.colors.white};
  box-shadow: 0 0 10px 0 #B7C68B;

  @media (max-width: ${theme.breakpoints.md}) {
    box-shadow: none;
    padding: 0;
  }
`

function BlogPreview(props: {blogPost: blogPost}) {
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const date = new Date(props.blogPost.createdOn)
    const dateString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    setDate(dateString)
  }, [props.blogPost.createdOn])

  return (
    <NextLink href={`/blog/${props.blogPost.id}`}>
      <BlogPreivewWrapper>
        <BlogInfoWrapper>
          <HeaderText style={{fontSize: '20px'}}>
            {props.blogPost.title}
          </HeaderText>
          <BodyText style={{fontStyle: 'italic'}}>
            {date}
          </BodyText>
        </BlogInfoWrapper>
        
        <BlogImage
          src={props.blogPost.imagePaths[0]}
          alt={props.blogPost.title}
          width={300}
          height={250}
        />
      </BlogPreivewWrapper>
    </NextLink>
  )
}

export default BlogPreview
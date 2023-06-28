import styled from 'styled-components'
import Image from 'next/image'

import { blogPost } from '@/app/libs/types'
import { theme } from '@/app/libs/theme'
import { NextLink } from '@/app/libs/common-components';


const BlogPreivewWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 300px;
  margin: 30px;
  border-radius: 30px;
  background-color: ${theme.colors.beige};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
  }
`;

const BlogImage = styled(Image)`
  padding: 30px;
`;

function BlogPreview(props: {blogPost: blogPost}) {
  return (
    <NextLink href={`/blog/${props.blogPost.id}`}>
      <BlogPreivewWrapper>
        {props.blogPost.title}

        <BlogImage
          src={props.blogPost.imagePath}
          alt={props.blogPost.title}
          width={300}
          height={250}
        />
      </BlogPreivewWrapper>
    </NextLink>
  )
}

export default BlogPreview
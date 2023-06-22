import Image from 'next/image'
import { GetStaticProps, GetStaticPaths  } from 'next'
import type { blogPost } from '../../../database/blog_posts/blog_post_data'
import { useRouter } from 'next/router'
import path from 'path'
import fs from 'fs/promises'
import styled from 'styled-components'
import { theme } from '../../../app/libs/theme'
import { BodyText, HeaderText } from '../../../app/libs/common-components'

import headerImage from './headerImage.png'

/**
 * Fetches all blog post data from the database
 * @returns parsedBlogPostData - an array of objects containing the data for each blog post
 */
async function getBlogPostData() {
  const blogPostData = await import('../../../database/blog_posts/blog_post_data')
  const parsedBlogPostData = JSON.parse(JSON.stringify(blogPostData.blogPostData))

  return parsedBlogPostData
}

const BlogPostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: ${theme.sizing.body.normal};
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${theme.colors.darkBrown};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
`;

const BlogImage = styled(Image)`
  padding: 30px;
`;

const headerText = 'This is a header'
const bodyText = `
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus 
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus
`

export const getStaticProps: GetStaticProps = async (context) => {
  const title = context.params?.title
  const blogPostData = await getBlogPostData()
  const blogPost = blogPostData.find((post: blogPost) => post.title === title)

  if (!blogPost) {
    return {
      props: {
        hasError: true
      }
    }
  }

  return {
    props: {
      data: blogPost
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostData = await getBlogPostData()
  const paths = blogPostData.map((post: blogPost) => ({
    params: { title: post.title }
  }))

  return {
    paths: paths,
    fallback: false
  }
}

function BlogPost(props: {data: blogPost, hasError: boolean}) {
  const router = useRouter()

  if (props.hasError) {
    return (
      <div>
        <p>404</p>
      </div>
    )
  }

  if (router.isFallback) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <BlogPostWrapper>
      <TextWrapper>
        <HeaderText>
          {headerText}
        </HeaderText>
        <BodyText>
          {bodyText}
        </BodyText>
      </TextWrapper>

      <BlogImage
        src={headerImage}
        alt='title image'
        width={300}
      />
    </BlogPostWrapper>
  )
}

export default BlogPost
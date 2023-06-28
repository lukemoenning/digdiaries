import React from 'react'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import { blogPost } from '@/app/libs/types'
import { NormalPageWidth, HeaderText } from '@/app/libs/common-components'
import BlogPreview from '@/app/components/blog/BlogPreview'

const BlogPostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 30px;
`;

async function getBlogPostData() {
  const blogPostData = await import('@/database/blog_posts/blog_post_data.json')
  const parsedBlogPostData = JSON.parse(JSON.stringify(blogPostData.blogPosts))

  // sort blog posts by date most recent to least recent
  parsedBlogPostData.sort((postA: blogPost, postB: blogPost) => {
    const dateA = new Date(postA.createdOn).getTime();
    const dateB = new Date(postB.createdOn).getTime();
    return dateB - dateA;
  });

  return parsedBlogPostData
}

export const getStaticProps: GetStaticProps = async () => {
  const blogPostData = await getBlogPostData()

  if (!blogPostData) {
    return {
      props: {
        data: {},
        hasError: true,
      }
    }
  }

  return {
    props: {
      data: blogPostData,
      hasError: false,
    }
  }
}

function Blog(props: {data: blogPost[], hasError: boolean}) {
  if (props.hasError) {
    return (
      <div>
        <p>404</p>
      </div>
    )
  }

  console.log(props.data)
  return (
    <NormalPageWidth>
      <HeaderText>
        Check out my blog posts!
      </HeaderText>

      <BlogPostsWrapper>
        {props.data.map((blogPost: blogPost) => (
          <BlogPreview key={blogPost.id} blogPost={blogPost} />
        ))}
      </BlogPostsWrapper>
      
    </NormalPageWidth>
  )
}

export default Blog
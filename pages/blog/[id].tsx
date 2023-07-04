import Image from 'next/image'
import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths  } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { NormalPageWidth, BodyText, HeaderText } from '@/app/libs/common-components'
import type { blogPost } from '@/app/libs/types'
import { theme } from '@/app/libs/theme'
import Loading from '@/app/components/Loading'


const BlogPostWrapper = styled(NormalPageWidth)`
  flex-direction: row;
  margin: 20px auto;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  padding: 30px;
`

const BlogImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  margin: 20px;
`

const BlogImage = styled(Image)`
  padding: 30px;
`

async function getBlogPostData() {
  const blogPostData = await import('@/database/blog_posts/blog_post_data.json')
  const parsedBlogPostData = JSON.parse(JSON.stringify(blogPostData.blogPosts))

  return parsedBlogPostData
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const blogPostData = await getBlogPostData()

  const blogPost = blogPostData.find((blogPost: blogPost) => blogPost.id === id)

  if (!blogPost) {
    return {
      props: {
        data: {},
        hasError: true,
      }
    }
  }

  return {
    props: {
      data: blogPost,
      hasError: false,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostData = await getBlogPostData()
  const paths = blogPostData.map((blogPost: blogPost) => ({
    params: { id: blogPost.id }
  }))

  return {
    paths: paths,
    fallback: true
  }
}

function BlogPost(props: {data: blogPost, hasError: boolean}) {
  const router = useRouter()
  const [date, setDate] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!props.data.createdOn) {
      return
    }

    const date = new Date(props.data.createdOn)
    const dateString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    setDate(dateString)
  }, [props.data.createdOn])

  if (props.hasError) {
    return (
      <div>
        <p>404</p>
      </div>
    )
  }

  if (isLoading || router.isFallback) {
    return <Loading />
  }

  return (
    <BlogPostWrapper>
      <TextWrapper>
        <HeaderText>
          {props.data.title}
        </HeaderText>
        <BodyText style={{fontStyle: 'italic'}}>
          {date}
        </BodyText>
        <BodyText style={{whiteSpace: 'pre-line'}}>
          {props.data.body}
        </BodyText>
      </TextWrapper>

      <BlogImagesWrapper>
        {props.data.imagePath.map((imagePath: string) => {
          return (
            <BlogImage
              key={imagePath}
              src={imagePath}
              alt={props.data.title}
              width={300}
              height={300}
            />
          )}
        )}
      </BlogImagesWrapper>
    </BlogPostWrapper>
  )
}

export default BlogPost
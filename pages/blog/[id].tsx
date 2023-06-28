import Image from 'next/image'
import { GetStaticProps, GetStaticPaths  } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { NormalPageWidth, BodyText, HeaderText } from '@/app/libs/common-components'
import { blogPost } from '@/app/libs/types'


const BlogPostWrapper = styled(NormalPageWidth)`
  flex-direction: row;
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
          {props.data.title}
        </HeaderText>
        <BodyText>
          {props.data.body}
        </BodyText>
      </TextWrapper>

      <BlogImage
        src={props.data.imagePath}
        alt={props.data.title}
        width={300}
        height={250}
      />
    </BlogPostWrapper>
  )
}

export default BlogPost
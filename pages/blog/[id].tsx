import Image from 'next/image'
import { GetStaticProps, GetStaticPaths  } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { theme } from '../../app/libs/theme'
import { BodyText, HeaderText } from '../../app/libs/common-components'

export interface blogPost {
  id: string,
  createdOn: string,
  title: string,
  body: string,
  imagePath: string,
}

export interface blogPostData {
  blogPosts: blogPost[],
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

async function getBlogPostData() {
  const blogPostData = await import('../../database/blog_posts/blog_post_data.json')
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
        alt='title image'
        width={300}
        height={300}
        style={{objectFit: "cover", height: "auto"}}
      />
    </BlogPostWrapper>
  )
}

export default BlogPost
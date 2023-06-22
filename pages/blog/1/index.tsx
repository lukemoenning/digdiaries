import Image from 'next/image'
import { GetStaticProps, GetStaticPaths  } from 'next'
import { useRouter } from 'next/router'
import path from 'path'
import fs from 'fs/promises'
import styled from 'styled-components'
import { theme } from '../../../app/libs/theme'
import { BodyText, HeaderText } from '../../../app/libs/common-components'

import headerImage from './headerImage.png'

interface blogPostProps {
  headerText: string,
  bodyText: string,
  imageFilePath: string,
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

function BlogPost() {
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
import { NormalPageWidth, BodyText } from '@/app/libs/common-components'
import { theme } from '@/app/libs/theme'
import { NextLink }from '@/app/libs/common-components'

function InDevelopmentAlert() {
  return (
    <NormalPageWidth>
      <BodyText style={{margin: 'auto'}}>
        This page is currently in development. Check out my <NextLink style={{color: `${theme.colors.lightGreen}`, textAlign: 'center'}} href={`/blog/`}>blogs</NextLink> in the meantime!
      </BodyText>
    </NormalPageWidth>
  )
}

export default InDevelopmentAlert
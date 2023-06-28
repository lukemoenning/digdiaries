import { NormalPageWidth, HeaderText } from '@/app/libs/common-components'

function InDevelopmentAlert() {
  return (
    <NormalPageWidth>
      <HeaderText style={{margin: 'auto'}}>
        This page is currently in development. Check back in later!
      </HeaderText>
    </NormalPageWidth>
  )
}

export default InDevelopmentAlert
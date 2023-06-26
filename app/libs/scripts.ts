import { domainName } from './constants'

export const imageLoader = ({ src, width, quality }: {src: string, width: number, quality?: number}) => {
  return `${domainName}${src}?w=${width}&q=${quality || 75}`
}
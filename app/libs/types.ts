export interface blogPost {
  id: string,
  createdOn: string,
  title: string,
  body: string,
  imagePaths: [string],
}

export interface blogPostData {
  blogPosts: blogPost[],
}

export interface navItem {
  name: string,
  href: string,
}
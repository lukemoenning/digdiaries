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
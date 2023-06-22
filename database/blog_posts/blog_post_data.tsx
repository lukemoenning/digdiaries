export interface blogPost {
  title: string,
  body: string,
  image: any,
}

export interface blogPostData {
  blogPosts: blogPost[],
}

export const blogPostData: blogPostData = {
  "blogPosts": [
    {
      "title": "myfirstpost",
      "body": "This is my first post",
      "image": require("/database/blog_posts/images/my_first_post.png"),
    },
    {
      "title": "blog3",
      "body": "This is my second post",
      "image": require("/database/blog_posts/images/blog3.png"),
    },
  ]
}

export default blogPostData
export interface blogPost {
  title: string,
  body: string,
  imagePath: string,
}

export interface blogPostData {
  blogPosts: blogPost[],
}

export const blogPostData: blogPostData = {
  "blogPosts": [
    {
      "title": "My first post",
      "body": "This is my first post",
      "imagePath": "database/blog_posts/images/my_first_post.png",
    },
  ]
}
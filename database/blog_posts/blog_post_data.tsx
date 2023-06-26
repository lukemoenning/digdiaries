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
      "image": "/images/blog_posts/my_first_post.png",
    },
    {
      "title": "blog3",
      "body": "This is my second post",
      "image": "/images/blog_posts/blog3.png",
    },
  ]//matcher for python script (dont delete)
}

export default blogPostData
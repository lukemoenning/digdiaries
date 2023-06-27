import git
import json
import os

# clear terminal
os.system('clear') 


# pull latest changes from github
print('Pulling latest changes from GitHub...')
repo = git.Repo('./')
repo.remotes.origin.pull()


# read the existing blog post data
print('Reading the database...')
blog_post_data_filepath = os.path.join(os.getcwd(), 'database/blog_posts/blog_post_data.json')
blog_dict = None
with open(blog_post_data_filepath, 'r', encoding='utf-8') as f:
  blog_dict = json.load(f)
  f.close()


# get blog input from user
blog_title = input('Enter a title: ')
blog_id = ''.join(blog_title.split()).lower()
blog_body_text = input('Enter body text: ')


# validate the blog input
def ensureUniqueId(blog_dict, blog_title, blog_id):
  for post in blog_dict["blogPosts"]:
    if post["id"] == blog_id: # if the id already exists, ask for another one
      blog_title = input('Enter a unique title: ')
      blog_id = ''.join(blog_title.split()).lower()
      ensureUniqueId(blog_dict, blog_title, blog_id)

ensureUniqueId(blog_dict, blog_title, blog_id)


# create a new blog post from inputted data
print('Generating a new blog post...')
blog_created_on = "6/26/2023"

new_blog_post = {
  "id": blog_id,
  "createdOn": blog_created_on,
  "title": blog_title,
  "body": blog_body_text,
  "imagePath": "/images/blog_posts/" + blog_id + ".png"
}


# update database files with new blog post
print('Updating the database...')
blog_dict["blogPosts"].append(new_blog_post)
with open(blog_post_data_filepath, 'w', encoding='utf-8') as f:
  f.seek(0) # ensure writting at the beginning of the file
  json.dump(blog_dict, f, ensure_ascii=False, indent=2) 
  f.close()
  

# push changes to github
print('Pushing changes to GitHub...')
# repo.git.add('--all')
# repo.git.commit('-m', 'upload blog: ' + blog_id)
# repo.git.push()


print('Successfully uploaded blog post!')
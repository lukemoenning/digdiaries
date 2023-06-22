import git
import json
import os

# clear terminal
os.system('clear') 


# pull latest changes from github
print('Pulling latest changes from GitHub...')
repo = git.Repo('./')
repo.remotes.origin.pull()


# get blog input from user
blog_title = input('Enter a title: ')
blog_body_text = input('Enter body text: ')


# update database files with new blog post
print('Creating files...')
blog_post_data_filepath = os.path.join(os.getcwd(), 'database/blog_posts/blog_post_data.tsx')
print(blog_post_data_filepath)
print(os.getcwd())
first_line = 'export const blogPostData: blogPostData = {'
end = '//matcher for python script (dont delete)'
with open(blog_post_data_filepath, 'r') as f:
  file_content = f.read()
start_index = file_content.index(first_line) + len(first_line)  
end_index = file_content.index(end)
json_data = file_content[start_index:end_index]
blog_dict = json.loads(json_data)
print(blog_dict)


# push changes to github
# print('Pushing changes to GitHub...')
# repo.git.add('blog.txt')
# repo.git.commit('-m', 'added blog.txt')
# repo.git.push()

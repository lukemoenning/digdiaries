import webbrowser
import os
# import git

print('Pulling latest changes from GitHub...')
# repo = git.Repo('https://github.com/lukemoenning/digdiaries')
# origin = repo.remote(name='origin')
# origin.pull()


print('Opening post_blog/index.html in your browser...')
# filename = 'file:///'+os.getcwd()+'/post_blog.html'
# webbrowser.open_new_tab(filename)

blog_title = input('Enter a title: ')
blog_body_text = input('Enter body text: ')

print(blog_title, blog_body_text)

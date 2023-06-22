import git


print('Pulling latest changes from GitHub...')
repo = git.Repo('./')
repo.remotes.origin.pull()

blog_title = input('Enter a title: ')
blog_body_text = input('Enter body text: ')

print('Creating files...')
f = open('./blog.txt', 'w')
f.write('Title: ' + blog_title + '\n')
f.close()

print('Pushing changes to GitHub...')
repo.git.add('blog.txt')
repo.git.commit('-m', 'added blog.txt')
repo.git.push()

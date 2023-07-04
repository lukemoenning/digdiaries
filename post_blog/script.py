import git
import json
import os
import shutil
import tkinter as tk
import datetime
from tkinter import filedialog
from PIL import Image

# clear terminal
os.system('clear') 


# pull latest changes from github
print('Pulling latest changes from GitHub...')
repo = git.Repo(os.getcwd())
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
print('Enter/Paste body text. Press "Enter" then "Ctrl-D" to save it.')
blog_body_text = []
while True:
  try:
    line = input()
  except EOFError:
    break
  blog_body_text.append(line)
blog_body_text = '\n\n'.join(blog_body_text)


# validate the blog input
def ensureUniqueId(blog_dict, blog_title, blog_id):
  for post in blog_dict["blogPosts"]:
    if post["id"] == blog_id: # if the id already exists, ask for another one
      blog_title = input('Enter a unique title: ')
      blog_id = ''.join(blog_title.split()).lower()
      ensureUniqueId(blog_dict, blog_title, blog_id)

ensureUniqueId(blog_dict, blog_title, blog_id)


def convert_heic_to_png(file_path):
    heif_file = pyheif.read(file_path)
    image = Image.frombytes(
        heif_file.mode, 
        heif_file.size, 
        heif_file.data,
        "raw",
        heif_file.mode,
        heif_file.stride,
    )
    png_file_path = file_path + ".png"
    image.save(png_file_path, "PNG")
    return png_file_path

# get the blog image from user
input('Press enter to select an image or multiple images (CMD click to select multiple)...')
root = tk.Tk()
root.withdraw()
file_paths = filedialog.askopenfilenames(initialdir=os.path.expanduser('~/Downloads'), filetypes=[("Image Files", ("*.png", "*.jpg", "*.jpeg"))])
image_path_array = []

if file_paths:
  script_dir = os.path.dirname(os.path.abspath(__file__))
  destination_folder = os.path.join(script_dir, '../public/images/blog_posts')
  image_path = "/images/blog_posts/" + blog_id
  
  # convert images to png
  for i, file_path in enumerate(file_paths):
    # if file_path.endswith('.heic'):
    #   iamge = Image.open(convert_heic_to_png(file_path))
    # else: 
    #   image = Image.open(file_path)
    image = Image.open(file_path)
    image.save(file_path+'.png')
    
  # copy images to public folder
  for i, file_path in enumerate(file_paths):
    new_file_path = os.path.join(destination_folder, blog_id + '-' + str(i) + '.png')
    shutil.copy(file_path, new_file_path)
    image_path_array.append(image_path + '-' + str(i) + '.png')
      
    
# create a new blog post from inputted data
print('Generating a new blog post...')
current_date = datetime.datetime.now()
blog_created_on = current_date.isoformat()

new_blog_post = {
  "id": blog_id,
  "createdOn": blog_created_on,
  "title": blog_title,
  "body": blog_body_text,
  "imagePaths": image_path_array
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
repo.git.add('--all')
repo.git.commit('-m', 'upload blog: ' + blog_id)
repo.git.push()


print('Successfully uploaded blog post!')
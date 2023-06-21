FROM python:3
WORKDIR /app
COPY ./post_blog /app
RUN pip install --no-cache-dir -r requirements.txt
CMD [ "python", "./script.py" ]

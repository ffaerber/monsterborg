FROM arm32v7/python:2.7.15-slim

RUN apt-get update && \
  apt-get install -y \
  i2c-tools \
  vim \
  curl

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod a+x *.py

CMD [ "python", "-u", "./Main.py" ]

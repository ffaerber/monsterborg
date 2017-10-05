FROM arm32v7/ubuntu:17.10
MAINTAINER Felix Faerber <ffaerber@gmail.com>

RUN apt-get update && \
    apt-get install -y \
    vim \
    curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | sh
RUN apt-get install -y nodejs

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "node", "index.js" ]

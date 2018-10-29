FROM arm32v7/ubuntu

RUN \
  apt-get update -y && \
  apt-get install -y git wget tar xz-utils python build-essential && \
  apt-get clean

RUN \
  wget https://nodejs.org/dist/v10.11.0/node-v10.11.0-linux-armv6l.tar.xz && \
  tar xf node-v10.11.0-linux-armv6l.tar.xz && \
  cp -R node-v10.11.0-linux-armv6l/* /usr/local/ && \
  ln -s /usr/local/bin/node /usr/sbin/node && \
  ln -s /usr/local/bin/npm /usr/sbin/npm && \
  rm -r node-v10.11.0-linux-armv6l && \
  rm node-v10.11.0-linux-armv6l.tar.xz

RUN git clone https://github.com/darkenvy/TotalRecall.git

WORKDIR /TotalRecall/front/

RUN npm install

RUN npm run build

WORKDIR /TotalRecall/server/

RUN npm install

EXPOSE 7100

RUN echo "cache bust"

CMD [ "npm", "start" ]
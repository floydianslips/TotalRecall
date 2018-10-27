FROM arm32v7/ubuntu

RUN \
  apt-get update -y && \
  apt-get install -y git wget tar xz-utils python build-essential && \
  apt-get clean

RUN \
  wget https://nodejs.org/dist/latest/*linux-armv61.tar.xz && \
  tar xf *linux-armv61.tar.xz && \
  cp -R *linux-armv61/* /usr/local/ && \
  ln -s /usr/local/bin/node /usr/sbin/node && \
  ln -s /usr/local/bin/npm /usr/sbin/npm && \
  rm -r *linux-armv61 && \
  rm *linux-armv61.tar.xz

RUN git clone https://github.com/darkenvy/TotalRecall.git

WORKDIR /TotalRecall/server/

RUN npm install

EXPOSE 7100

RUN echo "cache bust"

CMD [ "npm", "start" ]

FROM troyfontaine/armhf-alpinelinux

EXPOSE 7100

RUN \
  apk add --no-cache --update \
  nodejs-current \
  npm \
  git \
  nodejs-current \
  npm \
  make \
  sqlite
# python \
# xz-utils \
# wget \
# tar \

RUN git clone https://github.com/darkenvy/TotalRecall.git
# && apk del git

RUN export LDFLAGS="-L/usr/local/lib"
RUN export CPPFLAGS="-I/usr/local/include -I/usr/local/include/sqlcipher"
RUN export CXXFLAGS="$CPPFLAGS"
RUN npm install \
  sqlite3 \
  --build-from-source \
  # --sqlite_libname=sqlcipher \
  --sqlite=/usr/bin/sqlite3 \
  --verbose
# RUN npm install sqlite3-arm

RUN node -e 'require("sqlite3")'
# RUN \
# wget https://nodejs.org/dist/latest/node-v10.11.0-linux-armv6l.tar.xz && \
# tar xf node-v10.11.0-linux-armv6l.tar.xz && \
# cp -R node-v10.11.0-linux-armv6l/* /usr/local/ && \
# ln -s /usr/local/bin/node /usr/sbin/node && \
# ln -s /usr/local/bin/npm /usr/sbin/npm && \
# rm -r node-v10.11.0-linux-armv6l && \
# rm node-v10.11.0-linux-armv6l.tar.xz

# WORKDIR /TotalRecall/server/

# RUN npm install

# CMD [ "npm", "start" ]
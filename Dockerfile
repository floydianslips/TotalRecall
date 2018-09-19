FROM troyfontaine/armhf-alpinelinux

RUN \
  apk add --no-cache --update nodejs-current npm git \
  && git clone https://github.com/darkenvy/TotalRecall.git \
  && apk del git

RUN cd /TotalRecall/server/ && npm install

CMD (cd /TotalRecall/server/ && npm start) & node /TotalRecall/front/simple-server.js
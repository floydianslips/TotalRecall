FROM troyfontaine/armhf-alpinelinux
RUN echo 'cache bust 1'
RUN \
  apk add --no-cache --update nodejs-current npm git \
  && git clone https://github.com/darkenvy/TotalRecall.git \
  && apk del git

RUN cd /TotalRecall/server/ && npm install
RUN cd /TotalRecall/front/ && npm install express

CMD (cd /TotalRecall/server/ && npm start) & (cd /TotalRecall/front/ && node simple-server.js)
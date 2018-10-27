const server = require('./server');
/* The server.js file is made to be a wrapper. This way, it is able to extend
the front-end development process. In order to invoke server by itself, we just
need to call it. That's it! 

todo: remove this file and have the server.js determine execution based on 
process.env.NODE_ENV */
server();

/* eslint consistent-return:0 */
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const backendServer = require('../../../server/server');

const host = process.env.HOST || null; // Let http.Server use its default IPv6/4 host
const port = parseInt(process.env.PORT || '7100', 10);
const app = express();
const options = {
  outputPath: path.resolve(process.cwd(), 'build'),
  publicPath: '/',
};

middleware(app, options);

backendServer(app);
// app.listen(port, host, (err) => {
//   if (err) console.error(err.message);
// });

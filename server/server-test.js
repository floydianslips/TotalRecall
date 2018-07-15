const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express(); // invoke an instance of express application.
app.set('port', 9000); // set our application port
app.use(morgan('dev')); // set morgan to log info about our requests for development use.
app.use(bodyParser.urlencoded({ extended: true })); // initialize body-parser to parse incoming parameters requests to req.body
app.use(cookieParser()); // initialize cookie-parser to allow us access the cookies stored in the browser.

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/decks', (req, res) => {
  const decks = [
    {
      id: '1',
      title: 'Fruits',
      count: 3,
    },
    {
      id: '2',
      title: 'samples',
      count: 3,
    },
    {
      id: '3',
      title: 'es-en Top 5000',
      count: 5943,
    },
  ];

  res.send(JSON.stringify(decks));
});

app.get('/deck/:id', (req, res) => {
  const filepath = `${path.join(__dirname, 'decks', req.params.id)}.json`;
  fs.readFile(filepath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/login', (req, res) => {
  console.log(req.body)
  res.send('success');
});

console.log('listening on 3001');
app.listen(3001);

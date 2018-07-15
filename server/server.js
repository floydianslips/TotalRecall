const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');
const db = require('./models');

const SECRET = 'abcdefghijkl'

const { user, score, deck } = db;
const app = express(); // invoke an instance of express application.
user.sync();
score.sync();
deck.sync();

// app.use(cookieParser()); // initialize cookie-parser to allow us access the cookies stored in the browser.
app.set('port', 3001); // set our application port
app.use(morgan('dev')); // set morgan to log info about our requests for development use.
app.use(bodyParser.urlencoded({ extended: true })); // initialize body-parser to parse incoming parameters requests to req.body
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

function genJWT(id) {
  return jwt.sign({ id }, SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

function isAuthorized(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, SECRET, (err, decoded) => {
    console.log('token', token);
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.jwtDecoded = decoded;
    next();
  });
}

app.post('/signup', (req, res) => {
  user.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then(user => {
    console.log('success', user.id);
    res.status(200).send({ auth: true, token: genJWT(user.id) });
  })
  .catch(err => {
    const message = (err && err.errors && err.errors[0] && err.errors[0].message) || 'Cannot create new user.'
    res.status(500).send(message);
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  user.findOne({ where: { username } }).then(user => {
    if (!user) {
      res.status(400).send('Username does not exist')
    } else if (!user.validPassword(password)) {
      res.status(401).send('Incorrect username or password')
    } else {
      console.log('username', user.id);
      res.status(200).send({ auth: true, token: genJWT(user.id) })
    }
  });
});

app.get('/decks', isAuthorized, (req, res) => {
  console.log('isAuthed', req.jwtDecoded);
  res.send('decks!!!')
});

console.log('listening on 3001');
app.listen(3001);
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const db = require('./models');

const SECRET = 'abcdefghijkl'

// const decks = {};
const deckDir = path.join(__dirname, 'decks');
const files = fs.readdirSync(deckDir);
console.log('files in decks/', files);
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
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/* -------------------------- Look for new decks ---------------------------- */
async function findOrCreateNewDecks(name) {
  if (!name) return;

  await deck
    .findOrCreate({
      where: { name },
      defaults: { name },
    })
    .spread((deck, created) => {
      console.log('found deck', deck.id);
      console.log('isCreated', created);
    })
    .catch(err => {
      console.log('db err', err);
    });
}

files.forEach((file, index) => {
  // const id = file.substring(0, file.lastIndexOf('.'));
  if (!/\.json$/.test(file)) return;
  console.log('file', file);
  
  let deckName = null;
  try {
    const jsonUTF8 = fs.readFileSync(path.join(deckDir, file), 'utf8');
    const json = JSON.parse(jsonUTF8);
    deckName = (json && json.id) || null;
  } catch (e) {
    deckName = null;
  }

  console.log('executing', deckName);
  findOrCreateNewDecks(deckName);
  
  // const deckInDB = db.prepare(`select name from decks where name = '${id}'`).get();
  // if (!deckInDB) {
  //   db.prepare(`insert into decks ("name") values ('${id}');`).run();
    // console.log('deck not in db');
    // console.log('Found a new deck', id, '. Added  it to the deck table');
  // } else {
  //   console.log('deck is in db');
  // }

  // console.log('reading', id);
  // const tmp = fs.readFileSync(path.join(deckDir, `${id}.json`), 'utf8');
  // let tmpJson = {};
  // try {
  //   tmpJson = JSON.parse(tmp);
  // } catch (e) {
  //   tmpJson = {};
  // }
  // decks[id] = {};
  // decks[id].id = (tmpJson && tmpJson.id) || null;
  // decks[id].modified = fs.statSync(path.join(deckDir, `${id}.json`)).mtime;
});

// ============================ Route Helpers =============================== //

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

// =============================== Routes =================================== //

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

// app.get('/api/decks', (req, res) => {
//   res.type('application/json');
//   res.json(createDeckMetadata(decks));
// });

console.log('listening on 3001');
app.listen(3001);
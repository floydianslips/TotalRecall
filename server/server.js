const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const aSync = require('async')
const db = require('./models');

const SECRET = 'abcdefghijkl'

// const decks = {};
const deckDir = path.join(__dirname, 'decks');
const deckList = {};
const { user, score, deck } = db;

module.exports = _app => {
  const app = _app || express(); // invoke an instance of express application.
  
  // todo: extend jwt into cookie use for extended sessions
  // app.use(cookieParser()); // initialize cookie-parser to allow us access the cookies stored in the browser.
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
  
  async function databaseSync() {
    await user.sync();
    await score.sync();
    await deck.sync();
  }
  
  async function findOrCreateNewDecks({ jsonId, name, icon, count, file }) {
    await deck
      .findOrCreate({
        where: { name: jsonId },
        defaults: { name: jsonId },
      })
      .spread((deck, created) => {
        console.log('found deck', deck.id);
        console.log('isCreated', created);
  
        deckList[deck.id] = {
          id: deck.id,
          jsonId,
          filename: file,
          name,
          icon,
          count,
        };
      })
      .catch(err => {
        console.log('db err', err);
      });
  }
  
  async function forEachDeck(file) {
    if (!/\.json$/.test(file)) return;
  
    let jsonId = null;
    let name = null;
    let icon = null;
    let count = null;
  
    try {
      const jsonUTF8 = fs.readFileSync(path.join(deckDir, file), 'utf8');
      const json = JSON.parse(jsonUTF8);
      if (json) {
        jsonId = json.id;
        name = json.name;
        icon = json.icon;
        count = (json.cards && json.cards.length) || null;
      }
    } catch (e) {
      jsonId = null;
    }
  
    if (!jsonId) return;
    await findOrCreateNewDecks({ jsonId, name, icon, count, file });
    
    // deckList[jsonId] = Object.assign({}, deckList[jsonId], {
    //   jsonId,
    //   name,
    //   icon,
    //   count,
    // });
  }
  
  async function init() {
    await databaseSync();
    const dir = fs.readdirSync(deckDir);
    aSync.eachSeries(dir, forEachDeck, (err) => {
      if (err) console.log('err', err);
      console.log('all decks', deckList);
      console.log('--------- Ready ---------');
    })
  }
  
  init();
  
  // ============================ Route Helpers =============================== //
  
  function genJWT(id) {
    return jwt.sign({ id }, SECRET, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
  }
  
  function isAuthorized(req, res, next) { // eslint-disable-line consistent-return
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      req.jwtDecoded = decoded;
      next();
    });
  }
  
  // =============================== Routes =================================== //
  
  app.use(express.static(path.join(__dirname, '../', 'front/', 'build/')));
  
  app.get('/decks', isAuthorized, (req, res) => {
    // console.log('isAuthed', req.jwtDecoded);
    res.type('application/json');
    res.send(Object.values(deckList));
  });
  
  app.get('/deck/:deckId', isAuthorized, (req, res) => {
    res.type('application/json');
    const { deckId } = req.params;
    const deckName = deckList[deckId].filename;
    console.log('reading path', path.join(deckDir, deckName));
  
    fs.readFile(path.join(deckDir, deckName), { encoding: 'utf8' }, (err, data) => {
      if (err) {
        console.log('err', err);
        res.statusCode = 404;
        res.send({ auth: true, status: 404, statusText: 'Deck not found' });
      } else {
        console.log('success', data);
        let deck = {};
        try {
          deck = JSON.parse(data);
          res.send({ auth: true, deck });
        } catch (e) {
          deck = {};
          res.status(500);
          res.send({ auth: true, status: 500, statusText: 'Error parsing JSON' });
        }
      }
    });
  });
  
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
  
  app.post('/score', isAuthorized, (req, res) => {
    const { deckId } = req.body;
    const postedScore = req.body.score; // name conflict. renamed to postedScore.
    const userId = (req.jwtDecoded && req.jwtDecoded.id);
  
    if (!userId) {
      res.status(400)
      res.send('No id field present in JWT token. Unable to post score without a specified owner of said score.');
      return;
    }
  
    score.create({
      score: postedScore,
      userId,
      deckId,
    })
    .then(row => {
      console.log('success', row.id, postedScore);
      res.status(200).send({ auth: true, score: postedScore });
    })
    .catch(err => {
      const message = (err && err.errors && err.errors[0] && err.errors[0].message) || 'Cannot POST new score.'
      res.status(500).send(message);
    });
  })
  
  console.log('listening on 7101');
  app.listen(7100);
}


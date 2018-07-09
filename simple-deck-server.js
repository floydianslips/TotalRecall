const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
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

console.log('listening on 3001');
app.listen(3001);

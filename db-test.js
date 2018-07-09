const db = require('./models');

const { user, score } = db;

score.create({
  score: 100,
  deckId: 5,
});

console.log('done');

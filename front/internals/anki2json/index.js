const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ---------------------- Edit Below Only ----------------------------------- //

const filename = 'advanced.json';
const mapping = {
  front: [
    ['English'],
    [],
    [],
  ],
  back: [
    ['Burmese'],
    ['IPA'],
    [],
  ],
};

// --------------------- Edit Above Only ------------------------------------ //

const rl = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, filename)),
});

const newDeck = [];
let errors = 0;
function processCard(card) {
  if (!card) return;
  const sanitize = str => {
    let s = str;
    s = s.replace(/&#\d{2};?/g, '');
    s = s.replace(/<\s?\/?\s?\w{1,4}\s?>/g, '');
    return s;
  };
  const map = arr => arr.map(key => sanitize(card[key])).join(' ');

  const newCard = {};
  Object.keys(mapping).forEach(side => {
    const title = map(mapping[side][0]);
    const subtitle = map(mapping[side][1]);
    const body = map(mapping[side][2]);

    newCard[side] = {
      title,
      subtitle,
      body,
    };

    // delete empty keys
    Object.keys(newCard[side]).forEach(key => {
      if (!newCard[side][key]) {
        delete newCard[side][key];
      }
    });
  });

  newDeck.push(newCard);
}

rl.on('close', () => {
  console.log('newDeck length', newDeck.length);
  fs.writeFile(path.join(__dirname, 'out.json'), JSON.stringify(newDeck), { encoding: 'utf8' }, err => {
    if (err) console.log('err');
    console.log('done');
    console.log('errors', errors);
  });
});
rl.on('line', line => {
  if (line.length < 4) return;
  const newLine = line.replace(/,$/, '');
  let json = null;
  try {
    json = JSON.parse(newLine);
  } catch (e) {
    console.log('malformed JSON', e);
    errors += 1;
    json = null;
  }
  processCard(json);
});

import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
// import log from 'components/Logger';

function getJwtFromRedux() {
  return select(state => state.home && state.home.jwt);
}

function* ajax(opts) {
  return yield new Promise(resolve => {
    axios(opts)
      .then(({ status, statusText, data }) => {
        resolve({
          status,
          statusText,
          data,
        });
      })
      .catch(err => {
        const response = {};
        try {
          const jsonStr = JSON.stringify(err);
          const json = JSON.parse(jsonStr);
          response.status = (json && json.response && json.response.status) || null;
          response.statusText = (json && json.response && json.response.statusText) || null;
        } catch (e) {
          response.status = 418;
          response.statusText = 'Ajax request failed followed by a failure to parse said error.';
        }
        resolve(response);
      });
  });
}

export function* getDeckList() {
  const jwtToken = yield getJwtFromRedux();
  const get = yield ajax({
    method: 'GET',
    url: 'decks/',
    headers: { 'x-access-token': jwtToken },
  });
  console.log('decklist', get);

  const deckList = (get && get.data) || [];
  yield put({ type: 'SET_DECK_LIST', deckList });
}

export function* getDeck({ str }) {
  const jwtToken = yield getJwtFromRedux();
  const get = yield ajax({
    method: 'GET',
    url: `deck/${str}`,
    headers: { 'x-access-token': jwtToken },
  });

  const deck = (get && get.data && get.data.deck) || null;
  const deckId = str;
  console.log('deck', get, deck, deckId);
  yield put({ type: 'SET_DECK', deck, deckId });
}

export function* postLogin({ obj }) {
  const { username, password, createMode } = obj;
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);

  const url = createMode ? 'signup' : 'login';
  const post = yield ajax({
    method: 'POST',
    url,
    data,
  });

  const token = (post && post.data && post.data.token) || '';
  yield put({ type: 'SET_JWT', str: token });
}

export function* postScore({ obj }) {
  const { deckId, score } = obj;
  const data = new URLSearchParams();
  data.append('deckId', deckId);
  data.append('score', score);

  const jwtToken = yield getJwtFromRedux();
  const post = yield ajax({
    method: 'POST',
    url: 'score/',
    data,
    headers: { 'x-access-token': jwtToken },
  });
}

export default function* signup() {
  yield takeLatest('GET_DECK_LIST', getDeckList);
  yield takeLatest('GET_DECK', getDeck);
  yield takeLatest('POST_LOGIN', postLogin);
  yield takeLatest('POST_SCORE', postScore);
}

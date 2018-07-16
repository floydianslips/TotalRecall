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
    url: 'http://localhost:3001/decks',
    headers: {
      'x-access-token': jwtToken,
    },
  });
  console.log('decklist', get);

  const deckList = (get && get.data) || [];
  yield put({ type: 'SET_DECK_LIST', deckList });
}

export function* getDeck({ int }) {
  const get = yield ajax({
    method: 'GET',
    url: `http://localhost:3001/deck/${int}`,
  });

  const deck = (get && get.data) || null;
  const deckId = int;
  yield put({ type: 'SET_DECK', deck, deckId });
}

export function* postLogin({ obj }) {
  const { username, password } = obj;
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);

  const post = yield ajax({
    method: 'POST',
    // url: 'http://localhost:3001/signup',
    url: 'http://localhost:3001/login',
    data,
  });

  const token = (post && post.data && post.data.token) || '';
  yield put({ type: 'SET_JWT', str: token });
}

export default function* signup() {
  yield takeLatest('GET_DECK_LIST', getDeckList);
  yield takeLatest('GET_DECK', getDeck);
  yield takeLatest('POST_LOGIN', postLogin);
}

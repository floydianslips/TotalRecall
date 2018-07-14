import { put, takeLatest /* , select */ } from 'redux-saga/effects';
import axios from 'axios';
// import log from 'components/Logger';

function* ajax(opts) {
  return yield new Promise(resolve => {
    axios(opts).then(response => {
      resolve(response.status !== 200 ? JSON.stringify(response.statusText) : response.data);
    });
  });
}

export function* getDeckList() {
  const deckList = yield ajax({
    method: 'GET',
    url: 'http://localhost:3001/decks',
  });

  yield put({ type: 'SET_DECK_LIST', deckList });
}

export function* getDeck({ int }) {
  const deck = yield ajax({
    method: 'GET',
    url: `http://localhost:3001/deck/${int}`,
  });

  yield put({ type: 'SET_DECK', deck, deckId: int });
}

export default function* signup() {
  yield takeLatest('GET_DECK_LIST', getDeckList);
  yield takeLatest('GET_DECK', getDeck);
}

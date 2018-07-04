import { put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
// import log from 'components/Logger';

export function* postSignup({ int }) {
  // log.info('id', int);

  const opts = {
    method: 'GET',
    url: `http://localhost:3001/deck/${int}`,
  };

  const deck = yield new Promise(resolve => {
    axios(opts).then(response => {
      resolve(response.status !== 200 ? JSON.stringify(response.statusText) : response.data);
    });
  });

  // console.log('deck', deck);

  yield put({ type: 'SET_DECK', deck });
}

export default function* signup() {
  yield takeLatest('GET_DECK', postSignup);
}

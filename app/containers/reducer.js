// import { SUBMIT_PHONE_NUMBER } from './Text/Form/Input/constants';

const initialState = {
  deck: null,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DECK':
      return { ...state, deck: action.deck };
    case 'CLEAR_DECK_STORE':
      return { ...state, deck: null };
    default:
      return state;
  }
}

export default homeReducer;

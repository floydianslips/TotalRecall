// import { SUBMIT_PHONE_NUMBER } from './Text/Form/Input/constants';

const initialState = {
  deckId: null,
  deck: null,
  correct: 0,
  total: 0,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DECK':
      return {
        ...state,
        deck: action.deck,
        total: action.deck.length,
        deckId: action.deckId,
      };
    case 'CLEAR_DECK_STORE':
      return { ...state, deck: null };
    case 'ADD_CORRECT':
      return { ...state, correct: state.correct + 1 };
    default:
      return state;
  }
}

export default homeReducer;

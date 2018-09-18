// import { SUBMIT_PHONE_NUMBER } from './Text/Form/Input/constants';

const initialState = {
  jwt: '',
  deckList: [],
  deck: null,

  deckId: null,
  correct: 0,
  total: 0,
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DECK_LIST':
      return { ...state, deckList: action.deckList };
    case 'SET_DECK':
      return {
        ...state,
        deck: action.deck,
        total: (action.deck && action.deck.cards && action.deck.cards.length) || null,
        deckId: action.deckId,
        correct: 0,
      };
    case 'CLEAR_DECK_STORE':
      return { ...state, deck: null };
    case 'ADD_CORRECT':
      return { ...state, correct: state.correct + 1 };
    case 'SET_JWT':
      console.log('set jwt', action);
      return { ...state, jwt: action.str };
    default:
      return state;
  }
}

export default homeReducer;

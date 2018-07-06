import { createSelector } from 'reselect';

const selectHome = state => state.home;

const selectDeck = () => createSelector(selectHome, homeState => homeState && homeState.deck);

const selectDeckList = () => createSelector(selectHome, homeState => homeState && homeState.deckList);

const selectDeckLength = () => createSelector(selectHome, homeState => homeState && homeState.total);

const selectDeckCorrect = () => createSelector(selectHome, homeState => homeState && homeState.correct);

const selectDeckId = () => createSelector(selectHome, homeState => homeState && homeState.deckId);

export { selectDeck, selectDeckList, selectDeckLength, selectDeckCorrect, selectDeckId };

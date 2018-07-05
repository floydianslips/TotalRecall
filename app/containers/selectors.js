import { createSelector } from 'reselect';

const selectHome = state => state.home;

const selectDeck = () => createSelector(selectHome, homeState => homeState && homeState.deck);

const selectDeckLength = () => createSelector(selectHome, homeState => homeState && homeState.total);

export { selectDeck, selectDeckLength };

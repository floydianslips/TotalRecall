import { createSelector } from 'reselect';

const selectHome = state => state.home;

const selectDeck = () => createSelector(selectHome, homeState => homeState && homeState.deck);

export { selectDeck };

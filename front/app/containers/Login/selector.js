import { createSelector } from 'reselect';

const selectHome = state => state.home;

const selectJWT = () => createSelector(selectHome, homeState => homeState && homeState.jwt);

const selectAuthenticated = () => createSelector(selectHome, homeState => homeState && homeState.authenticated);

export { selectHome, selectJWT, selectAuthenticated };

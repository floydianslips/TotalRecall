import React from 'preact';
import ReactDOM from 'preact-compat';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';
import App from './containers/App';
// import './injectGlobal';
// import 'static/foundation.css'; // include in the bundle instead of external

// ReactDOM.render(<App />, document.getElementById('root'));

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
);

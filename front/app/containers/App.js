import React from 'preact';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Navbar from 'components/Navbar';
import List from 'containers/List';
import Login from 'containers/Login';
import log from 'components/Logger';
import Deck from './Deck';
import Score from './Score';
import reducer from './reducer';
import saga from './sagas';
import Styles from './styles';
import { selectJWT, selectAuthenticated } from './selectors';

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckSelected: null,
    };

    const auth = cookie.load('auth');
    if (auth) props.dispatchSetJWT(auth);

    this.deckClicked = this.deckClicked.bind(this);
    this.finishDeck = this.finishDeck.bind(this);
    this.submit = this.submit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillUpdate(props) {
    if (props.selectJWT) cookie.save('auth', props.selectJWT);
  }

  logout() {
    cookie.save('auth', '');
    this.props.dispatchSetJWT('', '');
  }

  deckClicked(deckSelected) {
    log.debug('deckClicked', deckSelected);
    this.setState(state => ({ ...state, deckSelected }));
  }

  finishDeck() {
    this.setState(state => ({ ...state, deckSelected: -1 }));
  }

  submit(score) {
    log.info('placeholder: submitting score', score);
    this.setState(state => ({ ...state, deckSelected: 0 }));
  }

  render() {
    /* eslint-disable no-else-return */
    const { deckSelected } = this.state;
    const notAuthenticated = !this.props.selectAuthenticated && !this.props.selectJWT;
    const View = () => {
      if (notAuthenticated) {
        return <Login />;
      } else if (deckSelected === -1) {
        return <Score submit={this.submit} />;
      } else if (deckSelected) {
        return <Deck deckId={deckSelected} finishDeck={this.finishDeck} />;
      }
      return <List deckClicked={this.deckClicked} />;
    };

    return (
      <Styles>
        <Navbar hidden={notAuthenticated} logout={this.logout} />
        {/* <Deck deckId={1} finishDeck={this.finishDeck} /> */}
        <View />
      </Styles>
    );
  }
}

App.propTypes = {
  dispatchSetJWT: PropTypes.func,
  selectJWT: PropTypes.string,
  selectAuthenticated: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchSetJWT: (str, authenticated) => dispatch({ type: 'SET_JWT', jwt: str, authenticated }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectJWT: selectJWT(),
  selectAuthenticated: selectAuthenticated(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);

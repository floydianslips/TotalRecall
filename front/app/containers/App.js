import React from 'preact';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import List from 'containers/List';
import Login from 'containers/Login';
import log from 'components/Logger';
import Deck from './Deck';
import Score from './Score';
import reducer from './reducer';
import saga from './sagas';
import Styles from './styles';
import { selectJWT } from './selectors';

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckSelected: null,
    };

    // props.dispatchGetDeckList();

    this.deckClicked = this.deckClicked.bind(this);
    this.finishDeck = this.finishDeck.bind(this);
    this.submit = this.submit.bind(this);
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
    const View = () => {
      if (!this.props.selectJWT) {
        console.log('1');
        return <Login />;
      } else if (deckSelected === -1) {
        console.log('2');
        return <Score submit={this.submit} />;
      } else if (deckSelected > 0) {
        console.log('3');
        return <Deck deckId={deckSelected} finishDeck={this.finishDeck} />;
      }
      console.log('4');
      return <List deckClicked={this.deckClicked} />;
    };

    return (
      <Styles>
        <Navbar />
        {/* <Deck deckId={1} finishDeck={this.finishDeck} /> */}
        <View />
      </Styles>
    );
  }
}

App.propTypes = {
  dispatchGetDeckList: PropTypes.func,
  selectJWT: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    // dispatchGetDeckList: () => dispatch({ type: 'GET_DECK_LIST' }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectJWT: selectJWT(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);

import React from 'preact';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import List from 'containers/List';
import log from 'components/Logger';
import Deck from './Deck';
import Score from './Score';
import reducer from './reducer';
import saga from './sagas';
import Styles from './styles';
// import { selectDeckList } from './selectors';

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckSelected: null,
    };

    props.dispatchGetDeckList();

    this.deckClicked = this.deckClicked.bind(this);
    this.finishDeck = this.finishDeck.bind(this);
    this.submit = this.submit.bind(this);
  }

  deckClicked(deckSelected) {
    console.log('deckClicked', deckSelected);
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
      if (deckSelected === -1) {
        return <Score submit={this.submit} />;
      } else if (deckSelected > 0) {
        return <Deck deckId={deckSelected} finishDeck={this.finishDeck} />;
      }
      return <List deckClicked={this.deckClicked} />;
    };

    return (
      <Styles>
        <Navbar />
        <View />
      </Styles>
    );
  }
}

App.propTypes = {
  dispatchGetDeckList: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetDeckList: () => dispatch({ type: 'GET_DECK_LIST' }),
  };
}

const mapStateToProps = createStructuredSelector(
  {
    // selectDeckList: selectDeckList(),
  }
);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);

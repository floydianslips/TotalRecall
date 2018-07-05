import React from 'preact';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import CardButtons from 'components/CardButtons';
import Card from './card';
import reducer from './reducer';
import saga from './sagas';
import Style from './styles';
import { selectDeck, selectDeckLength } from './selectors';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      currentCard: 0,
    };

    this.props.fetchDeck(1);
    this.nextCard = this.nextCard.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    /* if newdeck and oldneck is empty, then we just got the deck from sagas.
    We setState for the newDeck and clear out sagas. Therefore we skip updating */
    if (!this.props.getDeck && nextProps.getDeck) {
      this.setState(state => ({
        ...state,
        deck: nextProps.getDeck,
        deckLength: nextProps.getDeck.length,
      }));
      this.props.clearDeckStore();
      return false;
    }
    return true;
  }

  // componentWillUpdate(nextProps) {
  //   console.log('componentWillUpdate', this.state);
  // }

  nextCard(isCorrect) {
    if (this.state.currentCard + 1 >= this.props.getDeckLength) return; // todo: end game
    this.setState(state => ({ ...state, currentCard: state.currentCard + 1 }));
    if (isCorrect) this.props.addCorrect();
  }

  render() {
    const card = this.state.deck && this.state.deck[this.state.currentCard];
    return (
      <Style>
        <div className="transform">
          <Card card={card} nextCard={this.nextCard} />
          <CardButtons nextCard={this.nextCard} />
        </div>
      </Style>
    );
  }
}

App.propTypes = {
  fetchDeck: PropTypes.func,
  clearDeckStore: PropTypes.func,
  addCorrect: PropTypes.func,

  getDeckLength: PropTypes.number,
  getDeck: PropTypes.arrayOf(PropTypes.object),
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchDeck: int => dispatch({ type: 'GET_DECK', int }),
    clearDeckStore: () => dispatch({ type: 'CLEAR_DECK_STORE' }),
    addCorrect: () => dispatch({ type: 'ADD_CORRECT' }),
  };
}

const mapStateToProps = createStructuredSelector({
  getDeck: selectDeck(),
  getDeckLength: selectDeckLength(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);

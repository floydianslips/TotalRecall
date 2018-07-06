import React from 'preact';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import CardButtons from 'components/CardButtons';
import Card from 'containers/Card';
import Styles from './styles';
import { selectDeck, selectDeckLength } from '../selectors';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      currentCard: 0,
    };

    this.props.dispatchGetDeck(props.deckId);
    this.nextCard = this.nextCard.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    /* if newdeck and oldneck is empty, then we just got the deck from sagas.
    We setState for the newDeck and clear out sagas. Therefore we skip updating */
    if (!this.props.selectDeck && nextProps.selectDeck) {
      this.setState(state => ({
        ...state,
        deck: nextProps.selectDeck,
        deckLength: nextProps.selectDeck.length,
      }));
      this.props.dispatchClearDeckStore();
      return false;
    }
    return true;
  }

  nextCard(isCorrect) {
    this.setState(state => ({ ...state, currentCard: state.currentCard + 1 }));
    if (isCorrect) this.props.dispatchAddCorrect();

    // When deck is complete, change view to Score
    if (this.state.currentCard >= this.props.selectDeckLength) {
      this.props.finishDeck();
    }
  }

  render() {
    const card = this.state.deck && this.state.deck[this.state.currentCard];
    return (
      <Styles>
        <div className="transform">
          <Card card={card} nextCard={this.nextCard} />
          <CardButtons nextCard={this.nextCard} />
        </div>
      </Styles>
    );
  }
}

Deck.propTypes = {
  deckId: PropTypes.number,
  finishDeck: PropTypes.func,

  dispatchGetDeck: PropTypes.func,
  dispatchClearDeckStore: PropTypes.func,
  dispatchAddCorrect: PropTypes.func,

  selectDeckLength: PropTypes.number,
  selectDeck: PropTypes.arrayOf(PropTypes.object),
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetDeck: int => dispatch({ type: 'GET_DECK', int }),
    dispatchClearDeckStore: () => dispatch({ type: 'CLEAR_DECK_STORE' }),
    dispatchAddCorrect: () => dispatch({ type: 'ADD_CORRECT' }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectDeck: selectDeck(),
  selectDeckLength: selectDeckLength(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

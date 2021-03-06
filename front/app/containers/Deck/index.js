import React from 'preact';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import CardButtons from 'components/CardButtons';
import Card from 'containers/Card';
import Styles from './styles';
import { selectDeck } from '../selectors';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      currentCard: 0,
      showButtons: false,
    };

    this.props.dispatchGetDeck(props.deckId);

    this.nextCard = this.nextCard.bind(this);
    this.showButtons = this.showButtons.bind(this);
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
    if (this.state.currentCard >= this.state.deck.cards.length) {
      this.props.finishDeck();
    }
  }

  showButtons(bool) {
    this.setState(state => ({ ...state, showButtons: bool }));
  }

  render() {
    const card = this.state.deck && this.state.deck && this.state.deck.cards[this.state.currentCard];
    return (
      <Styles>
        <div className="transform">
          <Card card={card} nextCard={this.nextCard} showButtons={this.showButtons} />
        </div>
        <CardButtons showButtons={this.state.showButtons} nextCard={this.nextCard} />
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

  // selectDeckLength: PropTypes.number,
  selectDeck: PropTypes.arrayOf(PropTypes.object),
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetDeck: str => dispatch({ type: 'GET_DECK', str }),
    dispatchClearDeckStore: () => dispatch({ type: 'CLEAR_DECK_STORE' }),
    dispatchAddCorrect: () => dispatch({ type: 'ADD_CORRECT' }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectDeck: selectDeck(),
  // selectDeckLength: selectDeckLength(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

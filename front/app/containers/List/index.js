import React from 'preact';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectDeckList } from '../selectors';
import Styles from './styles';

const List = props => {
  const decks =
    props.selectDeckList &&
    props.selectDeckList.map((deck, idx) => (
      <div
        className="deck"
        key={deck.id}
        onClick={() => props.deckClicked(deck.id)}
        onKeyDown={() => props.deckClicked(deck.id)}
        role="button"
        tabIndex={idx}
      >
        <b className="deck-title">{deck.title}</b>
        <div className="deck-count">{deck.count} cards</div>
      </div>
    ));

  return (
    <Styles>
      <div className="deck-containers">{decks}</div>
    </Styles>
  );
};

List.propTypes = {
  selectDeckList: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = createStructuredSelector({
  selectDeckList: selectDeckList(),
});

export default connect(mapStateToProps, undefined)(List);

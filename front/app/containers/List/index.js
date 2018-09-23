import React from 'preact';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectDeckList } from '../selectors';
import Styles from './styles';

class List extends React.Component {
  constructor(props) {
    super(props);

    const listIsEmpty = props.selectDeckList && props.selectDeckList.length === 0;
    if (listIsEmpty) {
      props.dispatchGetDeckList();
    }
  }

  render() {
    const decks =
      this.props.selectDeckList &&
      this.props.selectDeckList.map &&
      this.props.selectDeckList.map((deck, idx) => (
        <div
          className="deck"
          key={deck.name}
          onClick={() => this.props.deckClicked(deck.id)}
          onKeyDown={() => this.props.deckClicked(deck.id)}
          role="button"
          tabIndex={idx}
        >
          <h4 className="deck-title">{deck.name}</h4>
          <i className="icon">{deck.icon}</i>
          <div className="deck-count">{deck.count} cards</div>
        </div>
      ));

    return (
      <Styles>
        <div className="deck-containers">{decks}</div>
      </Styles>
    );
  }
}

List.propTypes = {
  selectDeckList: PropTypes.arrayOf(PropTypes.object),
  dispatchGetDeckList: PropTypes.arrayOf(PropTypes.object),
  deckClicked: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetDeckList: () => dispatch({ type: 'GET_DECK_LIST' }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectDeckList: selectDeckList(),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

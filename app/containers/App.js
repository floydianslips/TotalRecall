import React from 'preact';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Deck from './Deck';
import reducer from './reducer';
import saga from './sagas';
import Styles from './styles';
import { selectDeckList } from './selectors';

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  constructor(props) {
    super(props);

    props.dispatchGetDeckList();
  }

  render() {
    const decks =
      this.props.selectDeckList &&
      this.props.selectDeckList.map(deck => (
        <div className="deck">
          <b className="deck-title">{deck.title}</b>
          <div className="deck-count">{deck.count} cards</div>
        </div>
      ));

    return (
      <Styles>
        <div className="navbar-header">
          <div className="navbar-brand">
            <b>Flashy</b>
          </div>
        </div>
        <div className="deck-containers">
          {decks}
        </div>
      </Styles>
    );
  }
}

App.propTypes = {
  dispatchGetDeckList: PropTypes.func,
  selectDeckList: PropTypes.arrayOf(PropTypes.object),
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetDeckList: () => dispatch({ type: 'GET_DECK_LIST' }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectDeckList: selectDeckList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);

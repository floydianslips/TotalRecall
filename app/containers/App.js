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
import { selectDeck } from './selectors';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
    };

    this.props.fetchDeck(1);
  }

  shouldComponentUpdate(nextProps) {
    /* if newdeck and oldneck is empty, then we just got the deck from sagas.
    We setState for the newDeck and clear out sagas. Therefore we skip updating */
    if (!this.props.getDeck && nextProps.getDeck) {
      this.setState(state => ({ ...state, deck: nextProps.getDeck }));
      this.props.clearDeckStore();
      return false;
    }
    return true;
  }

  // componentWillUpdate(nextProps) {
  //   console.log('componentWillUpdate', this.state);
  // }

  render() {
    const card = this.state.deck && this.state.deck[1];
    return (
      <Style>
        <div className="transform">
          <Card card={card} />
          <CardButtons />
        </div>
      </Style>
    );
  }
}

App.propTypes = {
  fetchDeck: PropTypes.func,
  clearDeckStore: PropTypes.func,
  getDeck: PropTypes.arrayOf(PropTypes.object),
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchDeck: int => dispatch({ type: 'GET_DECK', int }),
    clearDeckStore: () => dispatch({ type: 'CLEAR_DECK_STORE' }),
  };
}

const mapStateToProps = createStructuredSelector({
  getDeck: selectDeck(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);

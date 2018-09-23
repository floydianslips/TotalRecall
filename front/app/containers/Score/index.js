import React from 'preact';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectDeckLength, selectDeckCorrect, selectDeckId } from '../selectors';
import Styles from './styles';

class Score extends React.Component {
  constructor(props) {
    super(props);

    this.deckId = props.selectDeckId;
    this.correct = props.selectDeckCorrect;
    this.amount = props.selectDeckLength;
    this.score = parseInt(this.correct / this.amount * 100, 10);

    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.submit(this.score);
    this.props.dispatchPostScore({
      deckId: this.deckId,
      score: this.score,
    });
  }

  render() {
    return (
      <Styles>
        <div className="window">
          <div className="title">
            <h4>All Done</h4>
            <i>Here is how you did</i>
          </div>
          <div className="results">
            <p>Deck: {this.deckId}</p>
            <p>Score: {this.correct}/{this.amount}</p>
            <div>
              <button className="button" type="submit" onClick={this.submit} tabIndex={0}>
                Done
              </button>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

Score.propTypes = {
  selectDeckLength: PropTypes.number,
  selectDeckCorrect: PropTypes.number,
  selectDeckId: PropTypes.string,

  submit: PropTypes.func,
  dispatchPostScore: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchPostScore: obj => dispatch({ type: 'POST_SCORE', obj }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectDeckLength: selectDeckLength(),
  selectDeckCorrect: selectDeckCorrect(),
  selectDeckId: selectDeckId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Score);

import React from 'preact';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectDeckLength, selectDeckCorrect, selectDeckId } from '../selectors';
import Styles from './styles';

const Score = props => {
  const id = props.selectDeckId;
  const correct = props.selectDeckCorrect;
  const amount = props.selectDeckLength;

  return (
    <Styles>
      <div className="window">
        <div className="title">
          <h4>All Done</h4>
          <i>Here is how you did</i>
        </div>
        <div className="results">
          <p>Deck: {id}</p>
          <p>Score: {correct}/{amount}</p>
          <div>
            <button className="button" type="submit" onClick={props.submit} tabIndex={0}>
              Done
            </button>
          </div>
        </div>
      </div>
    </Styles>
  );
};

Score.propTypes = {
  selectDeckLength: PropTypes.number,
  selectDeckCorrect: PropTypes.number,
  selectDeckId: PropTypes.string,

  submit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectDeckLength: selectDeckLength(),
  selectDeckCorrect: selectDeckCorrect(),
  selectDeckId: selectDeckId(),
});

export default connect(mapStateToProps, undefined)(Score);

import React from 'preact';
import PropTypes from 'prop-types';
import Styles from './styles';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* Note that the click-events-have-key-events has been disabled on the linter.
We already have keybindings that replicate the same functionality in another
module. Very Handicap accessible :) */
const CardButtons = props => (
  <Styles>
    <div className={props.showButtons ? 'show' : 'hidden'}>
      <div className="btn-box">
        <div className="tab left" role="button" tabIndex={-1} type="submit" onClick={() => props.nextCard(false)}>
          <span role="img" aria-label="emoji thumbs down">👎</span>
        </div>
      </div>
      <div className="btn-box" role="button" tabIndex={-2} type="submit" onClick={() => props.nextCard(false)}>
        <div className="tab right">
          <span role="img" aria-label="emoji thumbs up">👍</span>
        </div>
      </div>
    </div>
  </Styles>
);

CardButtons.propTypes = {
  nextCard: PropTypes.func,
  showButtons: PropTypes.bool,
};

export default CardButtons;

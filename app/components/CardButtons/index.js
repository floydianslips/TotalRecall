import React from 'preact';
import PropTypes from 'prop-types';
import Styles from './styles';

const CardButtons = props => (
  <Styles>
    <div className={props.showButtons ? 'show' : 'hidden'}>
      <div className="btn-box">
        <button className="button alert btn-thumbs" type="submit" onClick={() => props.nextCard(false)}>
          <span role="img" aria-label="emoji thumbs down">👎</span>
        </button>
      </div>
      <div className="btn-box">
        <button className="button success btn-thumbs" type="submit" onClick={() => props.nextCard(true)}>
          <span role="img" aria-label="emoji thumbs up">👍</span>
        </button>
      </div>
    </div>
  </Styles>
);

CardButtons.propTypes = {
  nextCard: PropTypes.func,
  showButtons: PropTypes.bool,
};

export default CardButtons;

import React from 'preact';
// import PropTypes from 'prop-types';
import Styles from './styles';

const CardButtons = () => (
  <Styles>
    <div className="btn-box">
      <button className="button alert btn-thumbs" type="submit">
        <span role="img" aria-label="emoji thumbs down">👎</span>
      </button>
    </div>
    <div className="btn-box">
      <button className="button success btn-thumbs" type="submit">
        <span role="img" aria-label="emoji thumbs up">👍</span>
      </button>
    </div>
  </Styles>
);

export default CardButtons;

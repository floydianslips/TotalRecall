import React from 'preact';
import PropTypes from 'prop-types';
import log from 'components/Logger';
// import { createStructuredSelector } from 'reselect';
// import { connect } from 'react-redux';
import Styles from './styles';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      flippedAtLeastOnce: false,
      locked: false,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  componentWillReceiveProps(nextProps) {
    const next = nextProps && nextProps.card && nextProps.card.front && nextProps.card.front.title;
    const prev = this.props && this.props.card && this.props.card.front && this.props.card.front.title;
    if (next !== prev) {
      // if new card, reset
      this.props.showButtons(false);
      this.setState(state => ({
        ...state,
        flipped: false,
        flippedAtLeastOnce: false,
        locked: false,
      }));
    }
  }

  componentWillUnmount() {
    this.cardRef.blur();
  }

  onClick() {
    this.setState(state => ({
      ...state,
      flipped: !state.flipped,
      flippedAtLeastOnce: true,
    }));
    this.props.showButtons(true);
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      case 37: // left
        if (!this.state.locked && this.state.flippedAtLeastOnce) this.props.nextCard(false);
        this.setState(state => ({ ...state, locked: true }));
        break;
      case 38: // up
        break;
      case 39: // right
        if (!this.state.locked && this.state.flippedAtLeastOnce) this.props.nextCard(true);
        this.setState(state => ({ ...state, locked: true }));
        break;
      case 40: // down
        this.onClick();
        break;
      default:
        break;
    }
  }

  focus() {
    try {
      log.debug('focusing');
      this.cardRef.focus();
    } catch (e) {
      (() => {})();
    }
  }

  render() {
    const side = this.state.flipped ? 'back' : 'front';
    const card = this.props.card || {};
    const { title, subtitle, body } = card[side] || '';

    return (
      <Styles className="grid-x">
        <div
          className="cell"
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          onfocusout={this.focus}
          ref={element => {
            this.cardRef = element;
          }}
        >
          <div className="card-head" />
          <div className="content-wrapper">
            <div className="content">
              <div className="title">
                <b>{title}</b>
              </div>
              <div className="subtitle">
                <i>{subtitle}</i>
              </div>
              <div className="body">
                <p>{body}</p>
              </div>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

Card.propTypes = {
  showButtons: PropTypes.func,
  nextCard: PropTypes.func,

  card: PropTypes.shape({
    front: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Card;

// const mapStateToProps = createStructuredSelector(
//   {
//     // getSignupData: selectSignupData(),
//   }
// );

// export function mapDispatchToProps(dispatch) {
//   return {
//     // postSignupForm: () => dispatch({ type: 'POST_SIGNUP' }),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Card);

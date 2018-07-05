import React from 'preact';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Styles from './styles';

// {
//   front: {
//     title: 'Tomato',
//     subtitle: 'red thing',
//     body: 'fruit or vegitable?',
//   },
//   back: {
//     body: 'It is a vegitable! Joke! Its a fruit',
//   },
// },

class Card extends React.Component {
  componentDidMount() {
    this.cardRef.focus();
  }

  onClick(e) {
    console.log('e', e);
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      case 37: // left
        break;
      case 38: // up
        break;
      case 39: // right
        break;
      case 40: // down
        break;
      default:
        break;
    }
  }

  render() {
    const side = 'front'; // front or back
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
          ref={element => {
            this.cardRef = element;
          }}
        >
          <h1 className="title">{title}</h1>
          <div className="content">
            <i className="subtitle">{subtitle}</i>
            <div className="body">{body}</div>
          </div>
        </div>
      </Styles>
    );
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    front: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

// export default Card;

const mapStateToProps = createStructuredSelector(
  {
    // getSignupData: selectSignupData(),
  }
);

export function mapDispatchToProps(dispatch) {
  return {
    // postSignupForm: () => dispatch({ type: 'POST_SIGNUP' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);

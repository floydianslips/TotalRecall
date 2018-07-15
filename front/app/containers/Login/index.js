import React from 'preact';
import PropTypes from 'prop-types';
// import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
// import { selectDeckList } from '../selectors';
import { USERNAME, PASSWORD } from './constants';
import Styles from './styles';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      [USERNAME]: '',
      [PASSWORD]: '',
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
    console.log('event', event);
    const { username, password } = this.state;
    this.setState(state => Object.assign({}, state, { disabled: true }));
    this.props.dispatchLogin({ username, password });
  }

  updateInputValue(event) {
    if (!event || !event.target) return;
    const { id } = event.target;
    this.setState(state => Object.assign({}, state, { [id]: event.target.value }));
  }

  render() {
    return (
      <Styles>
        <form onSubmit={this.submit}>
          <input
            id={USERNAME}
            type="text"
            value={this.state[USERNAME]}
            onChange={this.updateInputValue}
            name="username"
            placeholder="username"
            label="login"
            autoComplete="username"
            disabled={this.state.disabled}
          />
          <input
            id={PASSWORD}
            type="password"
            value={this.state[PASSWORD]}
            onChange={this.updateInputValue}
            name="password"
            placeholder="password"
            label="login"
            autoComplete="current-password"
            disabled={this.state.disabled}
          />
          <input className="button" type="submit" value="Login" disabled={this.state.disabled} />
        </form>
      </Styles>
    );
  }
}
Login.propTypes = {
  dispatchLogin: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: obj => dispatch({ type: 'POST_LOGIN', obj }),
  };
}

// const mapStateToProps = createStructuredSelector({
//   selectDeckList: selectDeckList(),
// });

export default connect(undefined, mapDispatchToProps)(Login);

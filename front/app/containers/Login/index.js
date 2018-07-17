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
      createMode: false,
      [USERNAME]: '',
      [PASSWORD]: '',
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.submit = this.submit.bind(this);
    this.createNewAccount = this.createNewAccount.bind(this);
  }

  submit(event) {
    event.preventDefault();
    console.log('event', event);
    const { username, password, createMode } = this.state;
    this.setState(state => Object.assign({}, state, { disabled: true }));
    this.props.dispatchLogin({ username, password, createMode });
  }

  updateInputValue(event) {
    if (!event || !event.target) return;
    const { id } = event.target;
    this.setState(state => Object.assign({}, state, { [id]: event.target.value }));
  }

  createNewAccount(event) {
    event.preventDefault();
    this.setState(state => Object.assign({}, state, { createMode: !state.createMode }));
  }

  render() {
    const buttonClass = 'button' + (this.state.createMode ? ' warning' : '');

    return (
      <Styles>
        <form onSubmit={this.submit}>
          <label htmlFor={USERNAME}>Username</label>
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
          <label htmlFor={PASSWORD}>Password</label>
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
          <a href="#" onClick={this.createNewAccount}>
            {this.state.createMode ? 'Login With Existing Account' : 'Create New Account'}
          </a>
          <input
            className={buttonClass}
            type="submit"
            disabled={this.state.disabled}
            value={this.state.createMode ? 'Create New Account' : 'Login'}
          />
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

/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from 'preact';
import PropTypes from 'prop-types';
// import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { selectDeckList } from '../selectors';
import { selectJWT, selectAuthenticated } from './selector';
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

    this.submit = this.submit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.createNewAccount = this.createNewAccount.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  // componentWillUpdate(props) {
  //   if (!props.selectJWT) {
  //     console.log('clear input');
  //     this.setState(state => ({ ...state, disabled: false }));
  //   }
  // }

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
    this.clearFields();
    this.setState(state => Object.assign({}, state, { createMode: !state.createMode }));
  }

  clearFields() {
    this.setState(state => ({
      ...state,
      disabled: false,
      createMode: false,
      [USERNAME]: '',
      [PASSWORD]: '',
    }));
  }

  render() {
    /* todo: have submit button be in state. Otherwise it will be buggy as
    render won't undate enough to be tight. */
    const buttonDisabled = this.state.disabled || (!this.state[USERNAME] && !this.state[PASSWORD]);
    const buttonClass = `button ${this.state.createMode ? ' warning' : ''}`;
    if (this.props.selectAuthenticated === false && this.state.disabled) {
      this.clearFields();
    }

    return (
      <Styles>
        <div className="banner" hidden={!(this.props.selectAuthenticated === false)}>
          Incorrect Username or Password
        </div>
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
          <button href="#" type="button" onClick={this.createNewAccount}>
            {this.state.createMode ? 'Login With Existing Account' : 'Create New Account'}
          </button>
          <input
            className={buttonClass}
            type="submit"
            disabled={buttonDisabled}
            value={this.state.createMode ? 'Create New Account' : 'Login'}
          />
        </form>
      </Styles>
    );
  }
}
Login.propTypes = {
  dispatchLogin: PropTypes.func,
  selectAuthenticated: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: obj => dispatch({ type: 'POST_LOGIN', obj }),
  };
}

const mapStateToProps = createStructuredSelector({
  selectJWT: selectJWT(),
  selectAuthenticated: selectAuthenticated(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

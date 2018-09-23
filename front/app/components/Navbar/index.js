/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'preact';
import PropTypes from 'prop-types';
import Styles from './styles';

const Navbar = props => (
  <Styles className="navbar-header">
    <div className="navbar-brand">
      <div className="left">
        <b>Flashy</b>
      </div>
      <div className="right">
        {props.hidden ? null : <div href="#" onClick={props.logout}>Log Out</div>}
      </div>
    </div>
  </Styles>
);

Navbar.propTypes = {
  hidden: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

export default Navbar;

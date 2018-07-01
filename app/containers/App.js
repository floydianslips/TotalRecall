import React from 'preact';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import PropTypes from 'prop-types';
import reducer from './reducer';
import saga from './sagas';


class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        Hello World!
        {this.location}
      </div>
    );
  }
}

App.propTypes = {
  // setSubmitted: PropTypes.func,
};

export function mapDispatchToProps(/* dispatch */) {
  return {
    // setSubmitted: submitted => dispatch({ type: SUBMITTED, submitted }),
  };
}

const mapStateToProps = createStructuredSelector({
  // isEventSubmitted: selectSubmitted(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(App);

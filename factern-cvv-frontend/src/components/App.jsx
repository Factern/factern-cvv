import React from 'react';
import { Route, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SubjectProfilePage from './containers/SubjectProfilePage';
import CredentialProvidersPage from './containers/CredentialProvidersPage';
import CredentialPage from './containers/CredentialPage';
import LinkDetailsPage from './containers/LinkDetailsPage';
import LoginPage from './containers/LoginPage';
import AuthRedirect from './containers/AuthRedirect';
import HomeRedirect from './HomeRedirect';
import * as actions from '../actions/authActions';
// import PrivateRoute from './PrivateRoute';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Router history={this.props.history}>
          <div>
            <Route exact path="/" component={HomeRedirect} />
            <Route path="/login" component={LoginPage} />
            <Route path="/invite" component={CredentialProvidersPage} />
            <Route path="/profile" component={SubjectProfilePage} />
            <Route path="/credential" component={CredentialPage} />
            <Route path="/link/:linkId" component={LinkDetailsPage} />
            <Route path="/auth" component={AuthRedirect} />
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

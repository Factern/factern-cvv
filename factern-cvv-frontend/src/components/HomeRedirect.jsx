import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authWithState } from '../reducers';

const mapStateToProps = state => ({
  accountType: authWithState(state).getAccountType(),
  isAuthenticated: authWithState(state).isAuthenticated,
});

const mapDispatchToProps = () => ({});

// eslint-disable-next-line react/prefer-stateless-function
class HomeRedirect extends React.Component {
  static propTypes = {
    accountType: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { accountType, isAuthenticated } = this.props;
    if (!isAuthenticated()) {
      this.props.history.push('/login');
    } else if ('CredentialProvider'.localeCompare(accountType) === 0) {
      this.props.history.push('/invite');
    } else {
      this.props.history.push('/profile');
    }
  }

  render() {
    return (<div />);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeRedirect);

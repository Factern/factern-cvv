import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CredentialProviderForm from '../CredentialProvidersForm';
import TopNavBar from '../TopNavBar';
import * as actions from '../../actions/CredentialProvidersActions';
import { authWithState } from '../../reducers';

function mapStateToProps(state) {
  return {
    credentialSubject: state.credentialSubject,
    accountType: authWithState(state).getAccountType(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

class CredentialProviderPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    credentialSubject: PropTypes.object.isRequired,
    accountType: PropTypes.string.isRequired,
  };

  saveCredentialSubject = () => {
    this.props.actions.saveCredentialSubject();
  };

  changeCredentialSubjectInput = (e) => {
    this.props.actions.changeCredentialSubjectInput(this.props.credentialSubject, e.target.name, e.target.value);
  };

  render() {
    if ('CredentialProvider'.localeCompare(this.props.accountType) !== 0) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <TopNavBar />
        <CredentialProviderForm
          credentialSubject={this.props.credentialSubject}
          onChange={this.changeCredentialSubjectInput}
          onSaveClick={this.saveCredentialSubject}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CredentialProviderPage);

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as actions from '../../actions/credentialActions';
import CredentialForm from '../CredentialForm';
import TopNavBar from '../TopNavBar';
import { authWithState } from '../../reducers';

function mapStateToProps(state) {
  return {
    credential: state.credential,
    accountType: authWithState(state).getAccountType(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

class CredentialPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    credential: PropTypes.object.isRequired,
    accountType: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.saveCredential = this.saveCredential.bind(this);
    this.changeCredentialInput = this.changeCredentialInput.bind(this);
    this.createLink = this.createLink.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchCredentialSubject();
  }

  saveCredential = () => {
    this.props.actions.saveCredential();
  };

  changeCredentialInput = (e) => {
    this.props.actions.changeCredentialInput(this.props.credential, e.target.name, e.target.value);
  };

  createLink = (credentialId) => {
    this.props.actions.createLink(credentialId);
  };

  render() {
    if ('Subject'.localeCompare(this.props.accountType) !== 0) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <TopNavBar />
        <CredentialForm
          createLink={this.createLink}
          onChange={this.changeCredentialInput}
          onSaveClick={this.saveCredential}
          credential={this.props.credential}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CredentialPage);

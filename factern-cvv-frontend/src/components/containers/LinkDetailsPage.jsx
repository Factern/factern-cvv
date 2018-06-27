import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FieldGroup from '../FieldGroup';
import TopNavBar from '../TopNavBar';
import * as actions from '../../actions/linkDetailsActions';

function mapStateToProps(state) {
  return {
    linkDetails: state.linkDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}


// eslint-disable-next-line react/prefer-stateless-function
class LinkDetails extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    linkDetails: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  static defaultProps = {
    match: { params: { linkId: '' } },
  };

  componentDidMount() {
    this.props.actions.fetchLinkDetails(this.props.match.params.linkId);
  }


  render() {
    const {
      credentialName, email, name, address, mobile,
    } = this.props.linkDetails;
    return (
      <div>
        <TopNavBar />
        <FieldGroup
          name="credential"
          id="linkDetailsCredName"
          label="Credential Name"
          value={credentialName}
          readOnly
        />
        <FieldGroup name="name" id="linkDetailsName" label="Name" value={name} readOnly />
        <FieldGroup name="email" id="linkDetailsEmail" label="Email" value={email} readOnly />
        <FieldGroup name="address" id="linkDetailsAddress" label="Address" value={address} readOnly />
        <FieldGroup name="mobile" id="linkDetailsCredentialMobile" label="Mobile" value={mobile} readOnly />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkDetails);

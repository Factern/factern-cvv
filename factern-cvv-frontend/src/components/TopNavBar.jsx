import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authWithState } from '../reducers';
import * as actions from '../actions/authActions';
import Auth0 from '../auth0/auth';

const auth0 = new Auth0();

const mapStateToProps = state => ({
  accountType: authWithState(state).getAccountType(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});


class TopNavBar extends React.Component {
  static propTypes = {
    accountType: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleLogout = () => {
    this.props.actions.logoutRequested();
    auth0.logout();
  };

  credentialProviderNav = () => (
    <Nav pullRight>
      <LinkContainer to="/invite">
        <NavItem>Invite</NavItem>
      </LinkContainer>
      <NavItem onClick={this.handleLogout}>Logout</NavItem>
    </Nav>
  );

  subjectNav = () => (
    <Nav pullRight>
      <LinkContainer to="/profile">
        <NavItem>Profile</NavItem>
      </LinkContainer>
      <LinkContainer to="/credential">
        <NavItem>Credentials</NavItem>
      </LinkContainer>
      <NavItem onClick={this.handleLogout}>Logout</NavItem>
    </Nav>
  );

  render() {
    const { accountType } = this.props;
    let nav;
    if ('CredentialProvider'.localeCompare(accountType) === 0) {
      nav = this.credentialProviderNav();
    } else if ('Subject'.localeCompare(accountType) === 0) {
      nav = this.subjectNav();
    } else {
      nav = (<Nav pullRight />);
    }

    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>CVVerify</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {nav}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavBar);

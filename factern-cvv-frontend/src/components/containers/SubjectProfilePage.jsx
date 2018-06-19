import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import SubjectProfileForm from '../SubjectProfileForm';
import TopNavBar from '../TopNavBar';
import * as actions from '../../actions/SubjectProfileActions';
import { authWithState } from '../../reducers';

function mapStateToProps(state) {
  return {
    subjectProfile: state.subjectProfile,
    accountType: authWithState(state).getAccountType(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

class SubjectProfilePage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    subjectProfile: PropTypes.object.isRequired,
    accountType: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchSubjectProfile();
  }

  saveSubjectProfile = () => {
    this.props.actions.saveSubjectProfile();
  };

  changeSubjectProfileInput = (e) => {
    this.props.actions.changeSubjectProfileInput(this.props.subjectProfile, e.target.name, e.target.value);
  };

  render() {
    if ('Subject'.localeCompare(this.props.accountType) !== 0) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <TopNavBar />
        <SubjectProfileForm
          subjectProfile={this.props.subjectProfile}
          onChange={this.changeSubjectProfileInput}
          onSaveClick={this.saveSubjectProfile}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubjectProfilePage);

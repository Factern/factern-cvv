import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/authActions';


class Authorize extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const queryStr = window.location.hash.substr(1);

    const pairs = queryStr.split('&');
    const queryArgs = {};
    pairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      queryArgs[key] = decodeURIComponent(value || '');
    });
    this.props.actions.authSuccessful(queryArgs);
  }

  render() {
    return (
      <div />
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);

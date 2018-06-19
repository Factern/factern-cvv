import React from 'react';
import {
  Button,
  PanelGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import FieldGroup from './FieldGroup';
import CredentialPanel from './CredentialPanel';

class CredentialForm extends React.Component {
  static propTypes = {
    credential: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    createLink: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: '0',
    };
  }

  handleSelect(activeKey) {
    this.setState(prevState => ({ ...prevState, activeKey }));
  }

  render() {
    return (
      <div>
        <PanelGroup
          accordion
          id="credentialFormPanelGroup"
          activeKey={this.state.activeKey}
          onSelect={this.handleSelect}
        >
          {this.props.credential.credentialList
          .map((cred, idx) =>
            (<CredentialPanel
              createLink={this.props.createLink}
              key={idx.toString()}
              credential={cred}
              index={idx.toString()}
            />))}
        </PanelGroup>

        <FieldGroup
          id="credentialDegree"
          label="Degree"
          name="degree"
          onChange={this.props.onChange}
          value={this.props.credential.degree}
        />
        <Button bsStyle="success" onClick={this.props.onSaveClick}>Add</Button>
      </div>
    );
  }
}

export default CredentialForm;

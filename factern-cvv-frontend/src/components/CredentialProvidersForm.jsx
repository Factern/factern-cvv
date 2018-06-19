import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import FieldGroup from './FieldGroup';
import CredentialSubject from '../types/index';

const CredentialProvidersForm = ({ credentialSubject, onChange, onSaveClick }) => (
  <div>
    <form>
      <FieldGroup
        id="credProStudentNumber"
        label="Student #"
        name="studentNumber"
        value={credentialSubject.studentNumber}
        onChange={onChange}
      />
      <FieldGroup
        id="credProName"
        label="Name"
        name="name"
        value={credentialSubject.name}
        onChange={onChange}
      />
      <FieldGroup
        id="credProEmail"
        label="Email"
        name="email"
        value={credentialSubject.email}
        onChange={onChange}
      />
      <Button bsStyle="success" onClick={onSaveClick}>Invite</Button>
    </form>
  </div>
);

CredentialProvidersForm.propTypes = {
  credentialSubject: CredentialSubject.isRequired,
  onChange: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
};

export default CredentialProvidersForm;

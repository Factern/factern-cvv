/* eslint-disable max-len */
import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FieldGroup from './FieldGroup';

const CredentialProvidersForm = ({ subjectProfile, onSaveClick, onChange }) => (
  <div>
    {subjectProfile.savedProfileId != null ?
      <Alert bsStyle="info">
        Subject Profile ID: <Link to={`credential/${subjectProfile.savedProfileId}`}>{subjectProfile.savedProfileId}</Link>
      </Alert>
      : null}
    <form>
      <FieldGroup
        id="subjectProfileName"
        label="Name"
        name="fullName"
        value={subjectProfile.fullName}
        onChange={onChange}
      />
      <FieldGroup
        id="subjectProfileEmail"
        label="Email"
        name="email"
        value={subjectProfile.email}
        onChange={onChange}
      />
      <FieldGroup
        id="subjectProfileAddress"
        label="Address"
        name="address"
        value={subjectProfile.address}
        onChange={onChange}
      />
      <FieldGroup
        id="subjectProfileMobile"
        label="Mobile"
        name="mobile"
        value={subjectProfile.mobile}
        onChange={onChange}
      />
    </form>
    <Button bsStyle="success" onClick={onSaveClick}>Save</Button>
  </div>
);

CredentialProvidersForm.propTypes = {
  subjectProfile: PropTypes.object.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CredentialProvidersForm;

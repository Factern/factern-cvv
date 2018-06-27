import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

const FieldGroup = ({
  name, id, label, help, value, onChange, ...props
}) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl value={value} onChange={onChange} name={name} {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);

const {
  string, func,
} = PropTypes;

FieldGroup.defaultProps = {
  help: null,
  value: '',
  onChange: () => {},
};

FieldGroup.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  label: string.isRequired,
  help: string,
  value: string,
  onChange: func,
};

export default FieldGroup;

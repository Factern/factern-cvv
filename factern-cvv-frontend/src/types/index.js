import PropTypes from 'prop-types';

const {
  shape, oneOfType, number, string,
} = PropTypes;

const CredentialSubject = shape({
  studentNumber: oneOfType([number, string]),
  name: string,
  email: string,
});

export default CredentialSubject;

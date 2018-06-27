import * as types from '../constants/ActionTypes';

export function changeCredentialSubjectInput(settings, fieldName, value) {
  return {
    type: types.CHANGE_INPUT_CREDENTIAL_SUBJECT,
    settings,
    fieldName,
    value,
  };
}

export function saveCredentialSubject() {
  return {
    type: types.SAVE_CREDENTIAL_SUBJECT,
  };
}

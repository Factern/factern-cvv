import * as types from '../constants/ActionTypes';

export function changeCredentialInput(settings, fieldName, value) {
  return {
    type: types.CHANGE_INPUT_CREDENTIAL,
    settings,
    fieldName,
    value,
  };
}

export function saveCredential() {
  return {
    type: types.SAVE_CREDENTIAL,
  };
}


export function fetchCredentialSubject() {
  return {
    type: types.FETCH_CREDENTIAL,
  };
}

export function createLink(credentialId) {
  return {
    type: types.CREATE_LINK,
    credentialId,
  };
}

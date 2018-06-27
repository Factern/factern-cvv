import * as types from '../constants/ActionTypes';

export function changeSubjectProfileInput(settings, fieldName, value) {
  return {
    type: types.CHANGE_INPUT_SUBJECT_PROFILE,
    settings,
    fieldName,
    value,
  };
}

export function saveSubjectProfile() {
  return {
    type: types.SAVE_SUBJECT_PROFILE,
  };
}

export function fetchSubjectProfile() {
  return {
    type: types.FETCH_SUBJECT_PROFILE,
  };
}

import * as types from '../constants/ActionTypes';

const initialState = {
  studentNumber: '',
  name: '',
  email: '',
  address: '',
};

function credentialSubject(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_INPUT_CREDENTIAL_SUBJECT: {
      const newState = { ...state };
      newState[action.fieldName] = action.value;

      return newState;
    }

    default:
      return state;
  }
}

export const withState = state => ({
  getStudentNumber: () => state.studentNumber,
  getName: () => state.name,
  getEmail: () => state.email,
  getAddress: () => state.address,
});

export default credentialSubject;

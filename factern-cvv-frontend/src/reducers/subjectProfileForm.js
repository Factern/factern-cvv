import * as types from '../constants/ActionTypes';

const initialState = {
  fullName: '',
  email: '',
  address: '',
  mobile: '',
  savedProfileId: null,
};

function subjectProfile(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_INPUT_SUBJECT_PROFILE: {
      const newState = { ...state };
      newState[action.fieldName] = action.value;

      return newState;
    }

    case types.SAVE_SUBJECT_PROFILE_DONE: {
      return { ...state, savedProfileId: action.data };
    }

    case types.FETCH_SUBJECT_PROFILE_DONE: {
      const {
        fullName,
        email,
        address,
        mobile,
        id,
      } = action.data;

      return {
        ...state,
        fullName: fullName || '',
        email: email || '',
        address: address || '',
        mobile: mobile || '',
        savedProfileId: id || '',
      };
    }

    default:
      return state;
  }
}

export const withState = state => ({
  getFullName: () => state.fullName,
  getEmail: () => state.email,
  getAddress: () => state.address,
  getMobile: () => state.mobile,
  getSubjectProfileId: () => state.subjectProfileId,
});

export default subjectProfile;

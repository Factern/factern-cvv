import * as types from '../constants/ActionTypes';

const initialState = {
  degree: '',
  credentialProviderList: [],
  credentialList: [],
  profile: {},
};

function credential(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_INPUT_CREDENTIAL: {
      const newState = { ...state };
      newState[action.fieldName] = action.value;

      return newState;
    }

    case types.FETCH_CREDENTIAL_PROV_LIST_DONE: {
      return {
        ...state,
        credentialProviderList: action.data,
      };
    }

    case types.FETCH_CREDENTIAL_DONE: {
      return {
        ...state,
        credentialList: action.data.credentials,
        profile: action.data.profile,
      };
    }

    default:
      return state;
  }
}

export const withState = state => ({
  getDegree: () => state.degree,
  getSubjectProfileId: () => state.subjectProfileId,
  getCredentialProviderList: () => state.credentialProviderList,
  getCredentialList: () => state.credentialList,
  getProfile: () => state.profile,
});

export default credential;

import * as types from '../constants/ActionTypes';

const initialState = {
  linkId: '',
  credentialId: '',
  credentialName: '',
  signature: '',
  email: '',
  name: '',
  address: '',
  mobile: '',
};

function linkDetails(state = initialState, action) {
  switch (action.type) {
    case types.LINK_DETAILS_FETCH_DONE: {
      // eslint-disable-next-line no-console
      console.log(`${action}`);

      return {
        ...state,
        linkId: action.id,
        credentialId: action.credentialId,
        credentialName: action.name,
        signature: action.signature,
        name: action.profile.fullName,
        email: action.profile.email,
        mobile: action.profile.mobile,
        address: action.profile.address,
      };
    }

    default:
      return state;
  }
}

export const withState = state => ({
  getLinkId: () => state.linkId,
  getCredentialId: () => state.credentialId,
  getCredentialName: () => state.credentialName,
  getSignature: () => state.signature,
  getEmail: () => state.email,
  getName: () => state.name,
  getAddress: () => state.address,
  getMobile: () => state.mobile,
});

export default linkDetails;

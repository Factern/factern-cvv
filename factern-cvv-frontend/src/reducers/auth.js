import jwtDecode from 'jwt-decode';

import * as types from '../constants/ActionTypes';

const initialState = Object.freeze({
  accessToken: '',
  expiresAtMs: 0,
  issuedAtMs: 0,
  redirectRoute: null,
  accountType: 'Anonymous',
  rootNodeId: null,
});

const tokenLocalStorageId = 'cvverifyAuthToken';

const storeTokenDetails = props =>
  localStorage.setItem(tokenLocalStorageId, JSON.stringify(props));

const clearTokenDetails = () =>
  localStorage.removeItem(tokenLocalStorageId);

const getTokenDetails = () => {
  const localToken = localStorage.getItem(tokenLocalStorageId);
  return (localToken ? JSON.parse(localToken) : null);
};

export default function auth(state, action) {
  if (!state) {
    const tokenDetails = getTokenDetails();

    return (
      !tokenDetails
        ? initialState
        : tokenDetails
    );
  }

  switch (action.type) {
    case types.AUTH_SUCCESSFUL_DONE: {
      const { tokenDetails } = action;
      const decoded = jwtDecode(tokenDetails.accessToken);
      const newState = {
        ...state,
        ...tokenDetails,
        login: decoded['https://api.factern.com/login_factern_id'],
      };
      storeTokenDetails(newState);
      return newState;
    }

    case types.ACCOUNT_TYPE_DONE: {
      const { accountType, rootNodeId } = action.data;
      const newState = {
        ...state,
        accountType,
        rootNodeId,
      };
      storeTokenDetails(newState);
      return newState;
    }

    case types.LOGOUT_REQUEST_DONE: {
      clearTokenDetails();

      return {
        ...state,
        ...initialState,
      };
    }

    default:
      return state;
  }
}

export const withState = state => ({
  getAccessToken: () => state.accessToken,
  getExpiresAtMs: () => state.expiresAtMs,
  getIssuedAtMs: () => state.issuedAtMs,
  getRedirectRoute: () => state.redirectRoute,
  getAccountType: () => state.accountType,
  getRootNodeId: () => state.rootNodeId,
  getLogin: () => state.login,
  isAuthenticated: () => state.accessToken && state.expiresAtMs > (new Date()).getTime(),
});

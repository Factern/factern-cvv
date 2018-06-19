import * as types from '../constants/ActionTypes';

export function authSuccessful(queryArgs) {
  return {
    type: types.AUTH_SUCCESSFUL,
    queryArgs,
  };
}

export function logoutRequested() {
  return {
    type: types.LOGOUT_REQUEST_DONE,
  };
}

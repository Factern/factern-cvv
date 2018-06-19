import * as types from '../constants/ActionTypes';

export function fetchLinkDetails(linkId) {
  return {
    type: types.LINK_DETAILS_FETCH,
    linkId,
  };
}

export function fetchLinkDetailsDone() {
  return {
    type: types.LINK_DETAILS_FETCH_DONE,
  };
}

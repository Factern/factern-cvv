import * as types from '../constants/ActionTypes';

export function fetchLinkDetails(linkId) {
  return {
    type: types.FETCH_LINK_DETAILS,
    linkId,
  };
}

export function fetchLinkDetailsDone() {
  return {
    type: types.FETCH_LINK_DETAILS_DONE,
  };
}

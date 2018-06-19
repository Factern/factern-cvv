import {
  select,
  call,
  put,
} from 'redux-saga/effects';

import { history } from '../store/configureStore';
import * as graphqlClient from '../graphql/index';
import {
  credentialSubjectWithState,
  subjectProfileWithState,
  credentialFormWithState,
  authWithState,
} from '../reducers';
import * as types from '../constants/ActionTypes';

const sagaDefs = [];
export default sagaDefs;


sagaDefs.push({
  actionType: types.SAVE_CREDENTIAL_SUBJECT,
  work: function* work() {
    const credentialSubject = yield select(credentialSubjectWithState);

    // eslint-disable-next-line no-unused-vars
    yield call(
      graphqlClient.subjectInviteMutate,
      credentialSubject.getName(),
      credentialSubject.getEmail(),
      credentialSubject.getStudentNumber(),
    );
  },
});

sagaDefs.push({
  actionType: types.SAVE_SUBJECT_PROFILE,
  work: function* work() {
    const subjectProfile = yield select(subjectProfileWithState);
    const auth = yield select(authWithState);

    const ret = yield call(
      graphqlClient.subjectProfileCreate,
      subjectProfile.getFullName(),
      subjectProfile.getEmail(),
      subjectProfile.getMobile(),
      subjectProfile.getAddress(),
      auth.getAccessToken(),
      auth.getLogin(),
    );
    yield put({ type: types.SAVE_SUBJECT_PROFILE_DONE, data: ret.id });
  },
});

sagaDefs.push({
  actionType: types.FETCH_SUBJECT_PROFILE,
  work: function* work() {
    const auth = yield select(authWithState);
    const data = yield call(graphqlClient.subjectProfileFetch, auth.getAccessToken(), auth.getLogin());
    yield put({ type: types.FETCH_SUBJECT_PROFILE_DONE, data });
  },
});

sagaDefs.push({
  actionType: types.FETCH_CREDENTIAL,
  work: function* work() {
    const authState = yield select(authWithState);
    const auth = { accessToken: authState.getAccessToken(), login: authState.getLogin() };
    const credSub = yield call(graphqlClient.credentialSubjectGet, auth);
    yield put({ type: types.FETCH_CREDENTIAL_DONE, data: credSub });
  },
});

sagaDefs.push({
  actionType: types.SAVE_CREDENTIAL,
  work: function* work() {
    const credential = yield select(credentialFormWithState);
    const name = credential.getDegree();
    const subjectProfileId = credential.getSubjectProfileId();
    const auth = yield select(authWithState);

    const ret = yield call(
      graphqlClient.credentialCreate,
      name, subjectProfileId, { accessToken: auth.getAccessToken(), login: auth.getLogin() },
    );

    // eslint-disable-next-line no-console
    console.log(`Created credential ${JSON.stringify(ret)}`);
    yield put({ type: types.FETCH_CREDENTIAL });
  },
});

sagaDefs.push({
  actionType: types.CREATE_LINK,
  work: function* work(action) {
    const { credentialId } = action;
    const authState = yield select(authWithState);
    const auth = { accessToken: authState.getAccessToken(), login: authState.getLogin() };
    yield call(graphqlClient.createLink, credentialId, auth);
    yield put({ type: types.FETCH_CREDENTIAL });
  },
});


sagaDefs.push({
  actionType: types.LINK_DETAILS_FETCH,
  work: function* work(action) {
    const { linkId } = action;
    const ret = yield call(graphqlClient.linkDetails, linkId);

    // eslint-disable-next-line no-console
    console.log(`Fetched link details ${JSON.stringify(ret)}`);

    yield put({ type: types.LINK_DETAILS_FETCH_DONE, ...ret });
  },
});

sagaDefs.push({
  actionType: types.AUTH_SUCCESSFUL,
  work: function* work(action) {
    const { queryArgs } = action;
    if (Array.isArray(queryArgs) || typeof queryArgs !== 'object') return;

    if (!queryArgs.id_token) return;
    const now = (new Date()).getTime();
    const tokenDetails = {
      accessToken: queryArgs.id_token,
      issuedAtMs: now,
      expiresAtMs: now + (queryArgs.expires_in * 1000),
    };
    yield put({ type: types.AUTH_SUCCESSFUL_DONE, tokenDetails });
    const auth = yield select(authWithState);
    const data = yield call(graphqlClient.accountTypeFetch, auth.getAccessToken(), auth.getLogin());
    // eslint-disable-next-line no-console
    console.log(`Account Type fetched ${JSON.stringify(data)}`);
    yield put({ type: types.ACCOUNT_TYPE_DONE, data });
    history.push('/');
  },
});

sagaDefs.push({
  actionType: types.LOGOUT_REQUEST,
  work: function* work() {
    // eslint-disable-next-line no-console
    console.log('logout requested');
    yield put({ type: types.LOGOUT_REQUEST_DONE });
  },
});

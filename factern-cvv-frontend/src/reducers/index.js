import { combineReducers } from 'redux';

import credentialSubject, * as fromCredentialSubject from './credentialSubjectForm';
import subjectProfile, * as fromSubjectProfile from './subjectProfileForm';
import credential, * as fromCredentialForm from './credential';
import linkDetails, * as fromLinkDetails from './linkDetails';
import auth, * as fromAuth from './auth';

const rootReducer = combineReducers({
  credentialSubject,
  subjectProfile,
  credential,
  linkDetails,
  auth,
});

export default rootReducer;

export const credentialSubjectWithState = state => fromCredentialSubject.withState(state.credentialSubject);
export const subjectProfileWithState = state => fromSubjectProfile.withState(state.subjectProfile);
export const credentialFormWithState = state => fromCredentialForm.withState(state.credential);
export const linkDetailsWithState = state => fromLinkDetails.withState(state.linkDetails);
export const authWithState = state => fromAuth.withState(state.auth);

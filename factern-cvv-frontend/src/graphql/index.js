import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
});

const SUBJECT_PROFILE_CREATE = gql`
mutation sPC($input: SubjectProfileInput!, $auth: FacternAuthDetails!) {
  subjectProfileCreate(input: $input, auth: $auth) {
    id
  } 
}
`;

const SUBJECT_PROFILE_FETCH = gql`
query sPG($auth: FacternAuthDetails!){
  subjectProfileGet(auth: $auth) {
    id
    fullName
    mobile
    email
    address
  }
}
`;

const SUBJECT_INVITE_CREATE = gql`
  mutation subInvite($input: SubjectInvite!){
    subjectInvite(input: $input) 
  }
`;

const CREDENTIAL_CREATE = gql`
mutation credCreate($input: CredentialInput!, $auth: FacternAuthDetails!){
  credentialCreate(input: $input, auth: $auth) {
    credentialId
    credentialSubjectId
  }
}
`;

const CRED_PROV_LIST = gql`
query {
  credentialProviderList {
    credentialProviders {
      id
      name
    }
  }
}
`;

const CRED_PROV_SUB_LINK = gql`
query creSubLink($auth: FacternAuthDetails!)
{
  credentialSubjectId(auth: $auth) {
    id
  }
}
`;

const CRED_SUB_GET = gql`
query credSubGet($auth: FacternAuthDetails!) {
  credentialSubjectGet(auth: $auth) {
    id
    profile {
      fullName
      mobile
      address
      email
    }
    credentials {
      id
      name
      links {
        id
      }
    }
  }
}
`;

const LINK_CREATE = gql`
mutation lC($input: LinkInput!, $auth: FacternAuthDetails!) {
  linkCreate(input: $input, auth: $auth) {
    id
  }
}
`;

const LINK_DETAILS = gql`
query lDQ($id: String!){
  linkDetailsQuery(id: $id) {
    id
    credentialId
    name
    signature
    profile {
      email
      fullName
      address
      mobile
    }
  }
}
`;

const ACC_TYPE_GET = gql`
query aTQ($auth: FacternAuthDetails!) {
  accountTypeQuery(auth: $auth) {
    accountType
    rootNodeId
  }
}
`;

function makeQuery(query, variables) {
  return client.query({ query, variables, fetchPolicy: 'no-cache' })
    .then(result => result.data);
}

export function makeMutation(mutation, variables) {
  return client.mutate({ mutation, variables })
    .then(result => result.data)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(`ERROR makeMutation ${JSON.stringify(mutation)}`, err.message);
    });
}

export function subjectProfileCreate(fullName, email, mobile, address, accessToken, login) {
  const variables = {
    input: {
      fullName, email, mobile, address,
    },
    auth: {
      accessToken,
      login,
    },
  };

  return makeMutation(SUBJECT_PROFILE_CREATE, variables)
    .then(result => result.subjectProfileCreate);
}

export function subjectProfileFetch(accessToken, login) {
  const variables = {
    auth: {
      accessToken,
      login,
    },
  };

  return makeQuery(SUBJECT_PROFILE_FETCH, variables)
    .then(result => result.subjectProfileGet);
}

export function subjectInviteMutate(name, email, studentNumber) {
  const variables = {
    input: { name, email, studentNumber },
  };

  return makeMutation(SUBJECT_INVITE_CREATE, variables)
    .then(result => result.subjectInvite);
}

export function credentialCreate(name, subjectProfileId, auth) {
  const variables = {
    input: {
      name, subjectProfileId, signature: 'sign',
    },
    auth,
  };

  return makeMutation(CREDENTIAL_CREATE, variables)
    .then(result => result.credentialCreate);
}

export function credentialProvidersList() {
  return makeQuery(CRED_PROV_LIST)
    .then(result => result.credentialProviderList);
}

export function credentialSubjectGet(auth) {
  return makeQuery(CRED_SUB_GET, { auth })
    .then(result => result.credentialSubjectGet);
}

export function credentialSubjectLink(auth) {
  return makeQuery(CRED_PROV_SUB_LINK, { auth })
    .then(result => result.credentialSubjectId);
}

export function createLink(credentialId, auth) {
  return makeMutation(LINK_CREATE, {
    input: { credentialId },
    auth,
  })
    .then(result => result.linkCreate);
}

export function linkDetails(id) {
  return makeQuery(LINK_DETAILS, { id })
    .then(result => result.linkDetailsQuery);
}

export function accountTypeFetch(accessToken, login) {
  return makeQuery(ACC_TYPE_GET, {
    auth: { accessToken, login },
  })
    .then(result => result.accountTypeQuery);
}

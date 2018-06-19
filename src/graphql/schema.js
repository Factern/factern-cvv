'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLSchema,
} = GraphQL;

const CredentialProviderQuery = require('./queries/CredentialProviderQuery');
const CredentialProviderListQuery = require('./queries/CredentialProviderListQuery');
const CredentialSubjectIdQuery = require('./queries/CredentialSubjectIdQuery');
const LinkQuery = require('./queries/LinkQuery');
const CredentialQuery = require('./queries/CredentialQuery');
const CredentialSubjectQuery = require('./queries/CredentialSubjectQuery');
const LinkDetailsQuery = require('./queries/LinkDetailsQuery');
const AccountTypeQuery = require('./queries/AccountTypeQuery');
const SubjectProfileQuery = require('./queries/SubjectProfileQuery');
const CredentialProviderMutation = require('./mutations/CredentialProviderMutation');
const SubjectProfileMutation = require('./mutations/SubjectProfileMutation');
const CredentialMutation = require('./mutations/CredentialMutation');
const LinkMutation = require('./mutations/LinkMutation');
const SubjectInviteMutation = require('./mutations/SubjectInviteMutation');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Default root query of the application',
    fields: {
        credentialProviderGet: CredentialProviderQuery.index(),
        credentialProviderList: CredentialProviderListQuery.index(),
        linkGet: LinkQuery.index(),
        subjectProfileGet: SubjectProfileQuery.index(),
        credentialGet: CredentialQuery.index(),
        credentialSubjectGet: CredentialSubjectQuery.index(),
        credentialSubjectId: CredentialSubjectIdQuery.index(),
        linkDetailsQuery: LinkDetailsQuery.index(),
        accountTypeQuery: AccountTypeQuery.index(),
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    description: 'Default root mutation of the application',
    fields: {
        credentialProviderCreate: CredentialProviderMutation.index(),
        subjectProfileCreate: SubjectProfileMutation.index(),
        credentialCreate: CredentialMutation.index(),
        linkCreate: LinkMutation.index(),
        subjectInvite: SubjectInviteMutation.index(),
    },
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

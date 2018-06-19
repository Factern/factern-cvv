'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = GraphQL;

const CredentialSubjectType = require('./CredentialSubject');

const CredentialProviderInputType = new GraphQLInputObjectType({
    name: 'CredentialProviderInput',
    description: 'Credential Provider Input Type',

    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the credential provider'
        },
    })
});

module.exports = CredentialProviderInputType;

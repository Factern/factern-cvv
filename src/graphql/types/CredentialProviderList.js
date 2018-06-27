'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} = GraphQL;

const CredProvBasic = new GraphQLObjectType({
    name: 'CredentialProviderBasic',

    fields: () => ({
        id: {
            type: GraphQLString,
            description: '192bit UUID, The factern nodeID'
        },
        name: {
            type: GraphQLString,
            description: 'The name of the credential provider'
        }
    }),
});

const CredentialProviderType = new GraphQLObjectType({
    name: 'CredentialProviderList',
    description: 'Credential Provider Type',

    fields: () => ({
        credentialProviders: {
            type: new GraphQLList(CredProvBasic),
            description: 'List of credential providers'
        },
    })
});

module.exports = CredentialProviderType;

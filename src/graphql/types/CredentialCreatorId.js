'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLObjectType,
} = GraphQL;

const CredentialCreatorIdType = new GraphQLObjectType({
    name: 'CredentialCreatorId',
    description: 'Id Type',

    fields: () => ({
        credentialId: {
            type: GraphQLString,
            description: '192bit factern nodeId of the credential'
        },
        credentialSubjectId: {
            type: GraphQLString,
            description: '192bit factern nodeId of the credential subject, unique to the credential provider'
        }
    })
});

module.exports = CredentialCreatorIdType;

'use strict';

const GraphQL = require('graphql');
const CredentialType = require('./Credential');
const LinkType = require('./Link');

const {
    GraphQLObjectType,
    GraphQLList
} = GraphQL;

const CredentialRefType = new GraphQLObjectType({
    name: 'CredentialRef',
    description: 'Credential Ref Type',

    fields: () => ({
        credential: {
            type: CredentialType,
            description: 'The credential associated with this ref'
        },
        links: {
            type: new GraphQLList(LinkType.Output),
            description: 'The list of links for credential'
        }
    })
});

module.exports = CredentialRefType;

'use strict';

const GraphQL = require('graphql');

const LinkType = require('./Link');

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInputObjectType,
} = GraphQL;

const Output = new GraphQLObjectType({
    name: 'CredentialOutput',
    description: 'Credential Output Type',

    fields: () => ({
        id: {
            type: GraphQLString,
            description: '192bit factern nodeId of the credential'
        },
        name: {
            type: GraphQLString,
            description: 'The name of credential'
        },
        signature: {
            type: GraphQLString,
            description: 'The signature of credential'
        },
        links: {
            type: new GraphQLList(LinkType.Output),
            description: 'The list of links created for credential'
        }
    })
});

const Input = new GraphQLInputObjectType({
    name: 'CredentialInput',
    description: 'Credential Input Type',

    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of credential'
        },
        signature: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The signature of credential'
        },
    })
});

module.exports = { Output, Input };

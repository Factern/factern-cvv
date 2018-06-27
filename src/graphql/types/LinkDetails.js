'use strict';

const GraphQL = require('graphql');

const SubjectProfile = require('./SubjectProfile');

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
} = GraphQL;

const Output = new GraphQLObjectType({
    name: 'LinkDetailsOutput',
    description: 'Credential Output Type',

    fields: () => ({
        id: {
            type: GraphQLString,
            description: '192bit factern nodeId of the link'
        },
        profile: {
            type: SubjectProfile.Output,
            description: 'The subject profile'
        },
        name: {
            type: GraphQLString,
            description: 'The name of credential'
        },
        signature: {
            type: GraphQLString,
            description: 'The signature of credential'
        },
        credentialId: {
            type: GraphQLString,
            description: 'The factern ID of credential'
        }
    })
});

const Input = new GraphQLInputObjectType({
    name: 'LinkDetailsInput',
    description: 'Credential Input Type',

    fields: () => ({
        linkId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The factern node ID of link entity'
        },
    })
});

module.exports = { Output, Input };

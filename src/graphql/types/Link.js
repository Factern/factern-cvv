'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = GraphQL;

const Output = new GraphQLObjectType({
    name: 'LinkOutput',
    description: 'Link Type',

    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'The factern nodeId of link entity'
        },
    })
});

const Input = new GraphQLInputObjectType({
    name: 'LinkInput',
    description: 'Link Type',

    fields: () => ({
        credentialId: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The credential nodeId'
        },
    })
});

module.exports = { Input, Output };

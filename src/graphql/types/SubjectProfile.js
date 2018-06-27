'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInputObjectType
} = GraphQL;

const Output = new GraphQLObjectType({
    name: 'SubjectProfileOutput',
    description: 'Subject Profile Type',

    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'The factern ID of the subject'
        },
        fullName: {
            type: GraphQLString,
            description: 'Full name of subject'
        },
        email: {
            type: GraphQLString,
            description: 'The email of subject'
        },
        mobile: {
            type: GraphQLString,
            description: 'The cellular number of subject'
        },
        address: {
            type: GraphQLString,
            description: 'The address of the subject'
        }
    })
});


const Input = new GraphQLInputObjectType({
    name: 'SubjectProfileInput',
    description: 'Subject Profile Type',

    fields: () => ({
        fullName: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Full name of subject'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email of subject'
        },
        mobile: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The cellular number of subject'
        },
        address: {
            type: GraphQLString,
            description: 'The address of the subject'
        }
    })
});


module.exports = { Output, Input } ;

'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = GraphQL;


const Input = new GraphQLInputObjectType({
    name: 'SubjectInvite',
    description: 'SubjectInvite Input Type',

    fields: () => ({
        studentNumber: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The student identification number for university sending the invite'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of student'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email of student where invite will be sent'
        }
    })
});

module.exports = { Input };

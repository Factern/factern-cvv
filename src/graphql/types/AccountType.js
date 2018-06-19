'use strict';

const GraphQL = require('graphql');

const {
    GraphQLObjectType,
    GraphQLEnumType,
    GraphQLString,
} = GraphQL;

const Output = new GraphQLObjectType({
    name: 'AccountTypeOutput',
    description: 'Credential Output Type',

    fields: () => ({
        accountType: {
            type: new GraphQLEnumType({
                name: 'AccountType',
                values: {
                    CredentialProvider: { value: 0 },
                    Subject: { value: 1 },
                    Anonymous: { value: 2 }
                }
            }),
            description: 'The type of user making request'
        },
        rootNodeId: {
            type: GraphQLString,
            description: 'The node ID of root node (cvverity-cpNode or cvverity-subProfile)'
        }
    })
});

module.exports = { Output };

'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLInputObjectType
} = GraphQL;

const FacternAuthDetails = new GraphQLInputObjectType({
    name: 'FacternAuthDetails',
    description: 'Factern Auth Details',

    fields: () => ({
        accessToken: {
            type: GraphQLString,
            description: 'The JWT received from Auth0'
        },
        login: {
            type: GraphQLString,
            description: 'The login node ID that was issued the JWT'
        },
    }),
});

module.exports = FacternAuthDetails;

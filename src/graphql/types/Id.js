'use strict';

const GraphQL = require('graphql');

const {
    GraphQLString,
    GraphQLObjectType,
} = GraphQL;

const IdType = new GraphQLObjectType({
    name: 'Id',
    description: 'Id Type',

    fields: () => ({
        id: {
            type: GraphQLString,
            description: '192bit factern nodeId of the credential'
        }
    })
});

module.exports = IdType;

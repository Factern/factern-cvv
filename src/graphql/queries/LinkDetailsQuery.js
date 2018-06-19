'use strict';

const GraphQL = require('graphql');

const LinkDetailsType = require('../types/LinkDetails');
const LinkDetailsResolver = require('../resolver/LinkDetailsResolver');

const { GraphQLString } = GraphQL;

module.exports = {
    index() {
        return {
            type: LinkDetailsType.Output,
            description: 'Return a Link object',
            args: {
                id: {
                    type: GraphQLString,
                    description: 'The Factern nodeId of the Link entity'
                }
            },
            resolve(parent, args, context, info) {
                return LinkDetailsResolver.fetch(args);
            }
        }
    },
};

'use strict';

const GraphQL = require('graphql');

const LinkType = require('../types/Link');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const LinkResolver = require('../resolver/LinkResolver');

const { GraphQLString } = GraphQL;

module.exports = {
    index() {
        return {
            type: LinkType.Output,
            description: 'Return a Link object',
            args: {
                id: {
                    type: GraphQLString,
                    description: 'The Factern nodeId of the Link entity'
                },
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern auth details'
                },
            },
            resolve(parent, args, context, info) {
                return LinkResolver.fetch(args);
            }
        }
    },
};

'use strict';

const GraphQL = require('graphql');

const IdType = require('../types/Id');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const CredentialResolver = require('../resolver/CredentialResolver');

const { GraphQLString } = GraphQL;

module.exports = {
    index() {
        return {
            type: IdType,
            description: 'Return a Id',
            args: {
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern auth details',
                },
            },
            resolve(parent, args, context, info) {
                return CredentialResolver.fetchLink(args);
            }
        }
    },
};

'use strict';

const GraphQL = require('graphql');

const CredentialType = require('../types/Credential');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const CredentialResolver = require('../resolver/CredentialResolver');

const { GraphQLString } = GraphQL;

module.exports = {
    index() {
        return {
            type: CredentialType.Output,
            description: 'Return a Credential object',
            args: {
                id: {
                    type: GraphQLString,
                    description: 'The Factern nodeId of the Credential entity'
                },
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern Auth details',
                },
            },
            resolve(parent, args, context, info) {
                return CredentialResolver.fetch(args);
            }
        }
    },
};

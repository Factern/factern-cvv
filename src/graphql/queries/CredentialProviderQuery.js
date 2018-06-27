'use strict';

const GraphQL = require('graphql');

const CredentialProvider = require('../types/CredentialProvider');
const CredentialProviderResolver = require('../resolver/CredentialProviderResolver');

const { GraphQLString } = GraphQL;

module.exports = {
    index() {
        return {
            type: CredentialProvider,
            description: 'Return a CredentialProvider object',
            args: {
                id: {
                    type: GraphQLString,
                    description: 'The Factern nodeId of the Credential Provider entity'
                }
            },
            resolve(parent, args, context, info) {
                return CredentialProviderResolver.fetch(args);
            }
        }
    },
};

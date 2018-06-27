'use strict';

const GraphQL = require('graphql');

const CredentialProviderList = require('../types/CredentialProviderList');
const CredentialProviderListResolver = require('../resolver/CredentialProviderListResolver');

module.exports = {
    index() {
        return {
            type: CredentialProviderList,
            description: 'Return list of CredentialProvider objects',
            resolve(parent, args, context, info) {
                return CredentialProviderListResolver.fetch(args);
            }
        }
    },
};

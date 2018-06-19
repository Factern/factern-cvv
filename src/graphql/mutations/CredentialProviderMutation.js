'use strict';

const IdType = require('../types/Id');
const CredentialProviderInputType = require('../types/CredentialProviderInput');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const CredentialProviderResolver = require('../resolver/CredentialProviderResolver');

module.exports = {
    index() {
        return {
            type: IdType,
            description: 'Create a CredentialProvider object',
            args: {
                input: {
                    type: CredentialProviderInputType,
                    description: 'The Credential Provider Input Object'
                },
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern auth details'
                },
            },
            resolve(parent, args, context, info) {
                return CredentialProviderResolver.create(args);
            }
        }
    }
};

'use strict';

const CredentialCreatorId = require('../types/CredentialCreatorId');
const Credential = require('../types/Credential');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const CredentialResolver = require('../resolver/CredentialResolver');

module.exports = {
    index() {
        return {
            type: CredentialCreatorId,
            description: 'Create a Credential object',
            args: {
                input: {
                    type: Credential.Input,
                    description: 'The Credential Provider Input Object'
                },
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern Auth details',
                },
            },
            resolve(parent, args, context, info) {
                return CredentialResolver.create(args);
            }
        }
    }
};

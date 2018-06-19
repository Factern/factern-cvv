'use strict';
const GraphQL = require('graphql');

const AccountType = require('../types/AccountType');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const AccountTypeResolver = require('../resolver/AccountTypeResolver');

module.exports = {
    index() {
        return {
            type: AccountType.Output,
            description: 'Return account type of user making request',
            args: {
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern auth details'
                },
            },
            resolve(parent, args, context, info) {
                return AccountTypeResolver.fetch(args);
            }
        }
    },
};

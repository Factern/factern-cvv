'use strict';

const GraphQL = require('graphql');

const FacternAuthDetails = require('../types/FacternAuthDetails');
const CredentialSubjectType = require('../types/CredentialSubject');
const SubjectProfileResolver = require('../resolver/SubjectProfileResolver');

module.exports = {
    index() {
        return {
            type: CredentialSubjectType,
            description: 'Return a Credential Subject object',
            args: {
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern Auth details',
                },
            },
            resolve(parent, args, context, info) {
                return SubjectProfileResolver.fetchSubjectHome(args);
            }
        }
    },
};

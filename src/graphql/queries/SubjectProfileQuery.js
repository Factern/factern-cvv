'use strict';

const GraphQL = require('graphql');
const SubjectProfile = require('../types/SubjectProfile');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const SubjectProfileResolver = require('../resolver/SubjectProfileResolver');

module.exports = {
    index() {
        return {
            type: SubjectProfile.Output,
            description: 'Return profile of user making request',
            args: {
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern authentication details'
                },
            },
            resolve(parent, args, context, info) {
                return SubjectProfileResolver.fetch(args);
            }
        }
    },
};

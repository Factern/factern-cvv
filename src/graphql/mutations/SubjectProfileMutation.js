'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLSchema,
} = GraphQL;


const IdType = require('../types/Id');
const SubjectProfile = require('../types/SubjectProfile');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const SubjectProfileResolver = require('../resolver/SubjectProfileResolver');

module.exports = {
    index() {
        return {
            type: IdType,
            description: 'Create a SubjectProfile object',
            args: {
                input: {
                    type: SubjectProfile.Input,
                    description: 'The Subject Profile Input Object'
                },
                auth: {
                    type: FacternAuthDetails,
                    description: 'The factern auth details',
                }
            },
            resolve(parent, args, context, info) {
                return SubjectProfileResolver.create(args);
            }
        }
    }
};

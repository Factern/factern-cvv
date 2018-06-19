'use strict';

const GraphQL = require('graphql');
const SubjectProfileType = require('./SubjectProfile');
const CredentialType = require('./Credential');

const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
} = GraphQL;

const CredentialSubjectType = new GraphQLObjectType({
    name: 'CredentialSubject',
    description: 'Credential Subject Type',

    fields: () => ({
        id: {
            type: GraphQLString,
            description: '192bit UUID, The factern nodeID'
        },
        profile: {
            type: SubjectProfileType.Output,
            description: 'The profile of the subject'
        },
        credentials: {
            type: new GraphQLList(CredentialType.Output),
            description: 'The list of credentials of the subject'
        }
    })
});

module.exports = CredentialSubjectType;

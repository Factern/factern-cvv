'use strict';

const GraphQL = require('graphql');

const {
	GraphQLString,
	GraphQLObjectType,
    GraphQLList
} = GraphQL;

const CredentialSubjectType = require('./CredentialSubject');

const CredentialProviderType = new GraphQLObjectType({
	name: 'CredentialProvider',
	description: 'Credential Provider Type',

	fields: () => ({
        id: {
            type: GraphQLString,
            description: '192bit UUID, The factern nodeID'
        },
        name: {
            type: GraphQLString,
            description: 'The name of the credential provider'
        },
        credentialSubjects: {
            type: new GraphQLList(CredentialSubjectType),
            description: 'The list of credential subjects'
        }
    })
});

module.exports = CredentialProviderType;

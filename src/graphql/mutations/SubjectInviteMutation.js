'use strict';

const GraphQL = require('graphql');

const SubjectInvite = require('../types/SubjectInvite');
const SubjectInviteResolver = require('../resolver/SubjectInviteResolver');

module.exports = {
    index() {
        return {
            type: GraphQL.GraphQLString,
            description: 'Invite a credential subject',
            args: {
                input: {
                    type: SubjectInvite.Input,
                    description: 'The Credential Provider Input Object'
                }
            },
            resolve(parent, args, context, info) {
                return SubjectInviteResolver.invite(args);
            }
        }
    }
};

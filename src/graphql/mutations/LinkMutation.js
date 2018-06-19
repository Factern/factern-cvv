'use strict';

const IdType = require('../types/Id');
const LinkType = require('../types/Link');
const FacternAuthDetails = require('../types/FacternAuthDetails');
const LinkResolver = require('../resolver/LinkResolver');

module.exports = {
    index() {
        return {
            type: IdType,
            description: 'Create a Link',
            args: {
                input: {
                    type: LinkType.Input,
                    description: 'The Link Input Object'
                },
                auth: {
                    type: FacternAuthDetails,
                    description: 'Factern auth details'
                },
            },
            resolve(parent, args, context, info) {
                return LinkResolver.create(args);
            }
        }
    }
};

'use strict';

const factern = require('../../factern/factern');
const facternUtils = require('../../factern/utils');

const LinkController = {
    fetch: (args) => {
        const { auth, id } = args;
        return facternUtils.validateNodeWithAuth(id, auth)
            .then(linkId => ({id: linkId}))
            .catch((error) => {
                console.log(`error ${error}`);
                return {
                    error: error
                }
            });
    },

    create: (args) => {
        const { auth } = args;
        const { credentialId } = args.input;
        console.log(`Attempting to create link for ${JSON.stringify(credentialId)}`);
        return facternUtils.validateNodeWithAuth(credentialId, auth)
            .then(validCredId => factern.withToken('createEntity', {
                parentId: validCredId
            }, auth))
            .then(linkNode => linkNode.data)
            .then(linkNode => ({ id: linkNode.nodeId }))
            .catch((error) => {
                console.log(`error ${error}`);
                return {
                    error: error
                }
            });
    }
};

module.exports = LinkController;

'use strict';

const factern = require('../../factern/factern');
const constants = require('../../factern/constants');
const SubjectProfileResolver = require('./SubjectProfileResolver');

const AccountTypeController = {
    fetch: (args) => {
        const { auth } = args;
        if (!auth.accessToken) {
            return { accountType: 2 };
        }

        // if there is a named entity called cvverify-cpNode, it's a credential provider
        // otherwise it's a subject
        return factern.withToken('describe', {
            nodeId: constants.CRED_PROV_NODE
        }, auth)
            .then(node => {
                return ({accountType: 0, rootNode: node.data.node.nodeId});
            })
            .catch((err) => {
                if (err.status === 400) {
                    return SubjectProfileResolver.getSubjectRootNodeId(auth)
                        .then(nodeId => ({ accountType: 1, rootNode: nodeId }))
                } else {
                    throw err;
                }
            })
    },
};

module.exports = AccountTypeController;

'use strict';

const factern = require('./factern');
const constants = require('./constants');

const validateNode = (nodeId) =>
    factern.autoRefreshToken('describe', {nodeId})
        .then((result) => result.data.node.nodeId);

const validateNodeWithAuth = (nodeId, auth) =>
    factern.withToken('describe', {nodeId}, auth)
        .then(result => result.data.node.nodeId)
        .catch(err => {
           console.log(`Error validating node ${nodeId}: ${JSON.stringify(err)}`)
        });

const getParentId = (nodeId) =>
    factern.autoRefreshToken('describe', {nodeId})
        .then(result => result.data.node.parentId);

const getSubjectProfileNodeId = (auth) =>
    factern.withToken('describe', { nodeId: constants.SUB_PROFILE_NODE }, auth)
    .then(result => result.data.node.nodeId)
        .catch(err => {
            console.log(`Error getting cvverify-subProfile: ${JSON.stringify(err)}`)
        });

module.exports = {
    validateNode,
    getParentId,
    validateNodeWithAuth,
    getSubjectProfileNodeId,
};

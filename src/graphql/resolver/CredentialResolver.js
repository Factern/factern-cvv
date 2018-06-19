'use strict';

const factern = require('../../factern/factern');
const constants = require('../../factern/constants');
const facternUtils = require('../../factern/utils');
const LinkResolver = require('./LinkResolver');

const CredentialController = {

    fetch: (args) => {
        const { id, auth } = args;
        return facternUtils.validateNodeWithAuth(id, auth)
            .then(credId => Promise.all([
                factern.withToken('describe', {
                    nodeId: credId,
                    listChildren: { factType: 'Entity' }
                }, auth),
                factern.withToken('read', {
                    nodeId: credId,
                    template: constants.CRED_TEMPLATE
                }, auth)]))
            .then(values => ( [ values[0].data, values[1].data ] ))
            .then(values => {
                const [descResp, readTempResp] = values;
                const name = readTempResp.items[0].readItem.nodes[0].data;
                const signature = readTempResp.items[1].readItem.nodes[0].data;
                const id = descResp.node.nodeId;
                const linkIds = descResp.children.nodes.map(node => node.nodeId);
                const linkPromises = linkIds.map(linkId => LinkResolver.fetch({ id: linkId, auth }));

                return Promise.all(linkPromises)
                    .then(links => ({
                        id,
                        name,
                        signature,
                        links
                    }))
            })
    },

    create: (args) => {
        const { auth } = args;
        const {
            name,
            signature
        } = args.input;
        console.log(`Attempting to create credential ${JSON.stringify(args.input)}`);
        return facternUtils.getSubjectProfileNodeId(auth)
            .then(validSubProfId => fetchOrCreateSubjectEntity(validSubProfId, auth))
            .then((credentialSubjectNode) =>
                factern.withToken('createEntity', {
                    parentId: credentialSubjectNode.nodeId
                }, auth)
                    .then((credNodeData) => credNodeData.data)
                    .then((credentialNode) =>
                        factern.withToken('write', {
                            template: constants.CRED_TEMPLATE,
                            values: [name, signature],
                            nodeId: credentialNode.nodeId,
                        }, auth)
                            .then(() => ({
                                credentialId: credentialNode.nodeId,
                                credentialSubjectId: credentialSubjectNode.nodeId
                            }))))
            .catch((error) => {
                console.log(`error ${error}`);
                return {
                    error: error
                }
            });
    },

    fetchLink: (args) => {
        const { auth } = args;
        return facternUtils.getSubjectProfileNodeId(auth)
            .then(validSubProfId => fetchOrCreateSubjectEntity(validSubProfId, auth))
            .then(credentialSubjectNode => ({ id: credentialSubjectNode.nodeId }))
            .catch((error) => {
                console.log(`error ${error}`);
                return {
                    error: error
                }
            });
    },
};

const fetchOrCreateSubjectEntity = (subjectProfileId, auth) => {
    return factern.withToken('searchEntity', {
        fieldId: constants.CRED_PROV_SUB_PROF_LINK,
        operator: "equals",
        term: subjectProfileId,
        maxResults: 1 // ubp field, so only one result expected
    }, auth)
        .then(results => {
            const existing = results.data.nodes.filter(node => node.parentId === constants.CRED_PROV_ID);
            if (existing.length > 0) {
                return existing[0];
            }
            return factern.withToken('createEntity', { parentId: constants.CRED_PROV_ID }, auth)
                .then(credSubNode => credSubNode.data)
                .then(credSubNode => {
                    return factern.withToken('permission', {
                        targetNodeId: credSubNode.nodeId,
                        policy: {
                            effect: 'Allow',
                            actions: [ 'Read' ]
                        },
                    }, auth)
                        .then(() => factern.withToken('write', {
                            template: [ constants.CRED_PROV_SUB_PROF_LINK ],
                            values: [ subjectProfileId ],
                            nodeId: credSubNode.nodeId,
                        }, auth))
                        .then(() => credSubNode);
                })
        })
};

module.exports = CredentialController;

'use strict';

const factern = require('../../factern/factern');
const facternUtils = require('../../factern/utils');
const constants = require('../../factern/constants');
const SubjectProfileResolver = require('./SubjectProfileResolver');

const CredentialProviderController = {
    fetch: (args) => {
        const { id, auth } = args;
        console.log('attempting to read template SimpleCredentialProvider');
        return facternUtils.validateNodeWithAuth(id, auth)
            .then(nodeId => Promise.all([factern.withToken('describe', {
                    nodeId: nodeId,
                    listChildren: { factType: 'Entity' }
                }, auth), factern.withToken('read', {
                    template: constants.CRED_PROV_TEMPLATE,
                    nodeId: nodeId
                }, auth)]))
            .then(values => ([ values[0].data, values[1].data ]))
            .then((values) => {
                const entityNode = values[0].node;
                const tempRead = values[1];
                const id = entityNode.nodeId;
                const name = tempRead.items[0].readItem.nodes[0].data;
                const credSubIds = values[0].children.nodes.map(node => node.nodeId);
                const credSubPromises = credSubIds.map(credSubId => SubjectProfileResolver.fetchSubjectHome({id: credSubId, auth}));

                return Promise.all(credSubPromises)
                    .then(credentialSubjects => ({
                        id,
                        name,
                        credentialSubjects
                    }))
            })
            .catch((error) => {
                console.log(`error ${error}`);
                return {
                    error: error
                }
            });
    },


    create: (args) => {
        const { auth, input } = args;
        console.log(`attempting to write template SimpleCredentialProvider ${JSON.stringify(input)}`);
        return factern.withToken('createEntity', {
            name: constants.CRED_PROV_NAME,
            parentId: constants.CRED_PROVIDER_ROOT
        }, auth)
            .then((entityNode) => {
                return factern.withToken('write', {
                    template: constants.CRED_PROV_TEMPLATE,
                    values: [ input.name ],
                    nodeId: entityNode.data.nodeId,
                }, auth)
                .then(() => ({
                    id: entityNode.data.nodeId
                }))
            })
            .catch((error) => {
                console.log(`error ${error}`);
                return {
                    error: error
                }
            });
    },
};

module.exports = CredentialProviderController;

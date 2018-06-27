'use strict';

const factern = require('../../factern/factern');
const constants = require('../../factern/constants');

const CredentialProviderListController = {
    fetch: () => {
        console.log('Fetching list of credential providers');
        return factern.autoRefreshToken('describe', {
            nodeId: constants.CRED_PROVIDER_ROOT,
            listChildren: {
                factType: 'Entity',
            },
        })
            .then(val => val.data)
            .then(val => {
                const credProvIds = val.children.nodes.map(node => node.nodeId);
                const fetchNamePromise = id => factern.autoRefreshToken('read', {
                    template: constants.CRED_PROV_TEMPLATE,
                    nodeId: id
                })
                    .then(tempRead => tempRead.data)
                    .then(tempRead => ({
                        name: tempRead.items[0].readItem.nodes[0].data,
                        id
                    }));
                return Promise.all(credProvIds.map(id => fetchNamePromise(id)))
                    .then(list => ({
                        credentialProviders: list
                    }));
            })
    },
};

module.exports = CredentialProviderListController;

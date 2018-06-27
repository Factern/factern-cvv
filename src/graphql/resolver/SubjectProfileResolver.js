'use strict';

const factern = require('../../factern/factern');
const facternUtils = require('../../factern/utils');
const CredentialResolver = require('./CredentialResolver');
const constants = require('../../factern/constants');

const SubjectProfileController = {

    fetchSubjectHome: (args) => {
        const { auth } = args;
        return CredentialResolver.fetchLink({ auth })
            .then(credentialSubjectId => Promise.all([
                factern.withToken('describe', {
                    nodeId: credentialSubjectId.id,
                    listChildren: { factType: 'Entity' }
                }, auth),
                facternUtils.getSubjectProfileNodeId(auth)]))
            .then(values => ([ values[0].data, values[1] ]))
            .then(values => {
                const credSubNode = values[0];
                const subProId = values[1];
                const id = credSubNode.node.nodeId;
                const credentialIds = credSubNode.children.nodes.map(node => node.nodeId);
                const credentialPromises = credentialIds.map(credentialId => CredentialResolver.fetch({ id: credentialId, auth }));

                return readTemplate(subProId, auth)
                    .then(profile => {
                        return Promise.all(credentialPromises)
                            .then(credentials => ({ id, profile, credentials }))
                    })
            })
    },

    fetch: (args) => {
        const { auth } = args;
        return getOrCreateSubjectProfile(auth)
            .then(subProfId => factern.withToken(
                'read',
                {
                    template: constants.SUB_PROF_TEMPLATE,
                    nodeId: subProfId,
                },
                auth)
                .then(read => read.data)
                .then(read => ({
                    id: subProfId,
                    fullName: read.items[0].readItem.data,
                    email: read.items[1].readItem.data,
                    mobile: read.items[2].readItem.data,
                    address: read.items[3].readItem.data,
                }))
            )
    },

    create: (args) => {
        const { fullName, email, mobile, address } = args.input;
        const { auth } = args;
        console.log(`Writing template SubjectProfile ${JSON.stringify([fullName, email, mobile, address])}`);
        return getOrCreateSubjectProfile(auth)
            .then(subProfId =>
                factern.withToken('permission', {
                    targetNodeId: subProfId,
                    policy: {
                        effect: 'Allow',
                        granteeId: constants.CRED_PROV_ID,
                        actions: [ 'Read' ]
                    },
                }, auth)
                    .then(() =>
                        factern.withToken('write', {
                            template: constants.SUB_PROF_TEMPLATE,
                            values: [fullName, email, mobile, address],
                            nodeId: subProfId
                        }, auth))
                .then(() => {
                    console.log(`SubjectProfile created with id: ${subProfId}`);
                    return ({id: subProfId});
                })
                .catch((error) => {
                    console.log(`error ${error}`);
                    return {
                        error: error
                    }
                })
            );
    },

    getSubjectRootNodeId: (auth) => getOrCreateSubjectProfile(auth),

    readSubjectProfileTemplate: (subProfId, auth) => readTemplate(subProfId, auth),

    readSubjectProfileLink: (subId, auth) => readLink(subId, auth),
};

const readTemplate = (subProId, auth) => {
    return factern.withToken('read', {
        nodeId: subProId,
        template: constants.SUB_PROF_TEMPLATE
    }, auth)
        .then((readVal) => readVal.data)
        .then(readVal => {
            const fullName = readVal.items[0].readItem.data;
            const email = readVal.items[1].readItem.data;
            const mobile = readVal.items[2].readItem.data;
            const address = readVal.items[3].readItem.data;
            return { fullName, email, mobile, address };
        });
};

const readLink = (subId, auth) => {
    return factern.withToken('read', {
        nodeId: subId,
        template: [ constants.CRED_PROV_SUB_PROF_LINK ]
    }, auth)
        .then(value => value.data.items[0].readItem.data);
};

const getOrCreateSubjectProfile = (auth) => {
    return factern.withToken('describe',
        { nodeId: constants.SUB_PROFILE_NODE },
        auth)
        .then(subNode => subNode.data.node.nodeId)
        .catch(err => {
            if (err.status === 400) {
                return factern.withToken('createEntity',
                    { name: constants.SUB_PROFILE_NODE_NAME},
                    auth)
                    .then(node => node.data.nodeId);
            }
            throw err;
        })
};

module.exports = SubjectProfileController;

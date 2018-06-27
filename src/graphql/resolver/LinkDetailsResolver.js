'use strict';

const factern = require('../../factern/factern');
const constants = require('../../factern/constants');
const facternUtils = require('../../factern/utils');

const SubjectProfileResolver = require('./SubjectProfileResolver');

const LinkDetailsController = {
    fetch: (args) => {
        return facternUtils.validateNode(args.id)
            .then(linkId =>
                facternUtils.getParentId(linkId)
                    .then(credentialId =>
                        Promise.all([
                            credentialFetch(credentialId),
                            credentialSubjectProfileFetch(credentialId)
                        ])
                            .then(values => {
                                const { credentialId, name, signature } = values[0];
                                return ({ credentialId, name, signature, profile: values[1] });
                            }))
                    .then(values => {
                        const { credentialId, name, signature, profile } = values;
                        return ({ credentialId, name, signature, profile, id: linkId });
                    }))
            .catch((error) => {
                console.log(`error ${error}`);
                return {
                    error: error
                }
            });
    },
};

function credentialFetch(credentialId) {
    return factern.autoRefreshToken('read', {
        nodeId: credentialId,
        template: constants.CRED_TEMPLATE
    })
        .then(value => value.data)
        .then(readTempResp => {
            const name = readTempResp.items[0].readItem.nodes[0].data;
            const signature = readTempResp.items[1].readItem.nodes[0].data;
            return { credentialId, name, signature };
        })
}

function credentialSubjectProfileFetch(credentialId) {
    return facternUtils.getParentId(credentialId)
        .then(credentialSubjectId =>
            factern.getAnonymousAuth()
                .then(auth =>
                    SubjectProfileResolver.readSubjectProfileLink(credentialSubjectId, auth)
                    .then(subjectProfileId => SubjectProfileResolver.readSubjectProfileTemplate(subjectProfileId, auth))));
}

module.exports = LinkDetailsController;

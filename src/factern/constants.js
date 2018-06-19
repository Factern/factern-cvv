'use strict';

const CONSTANTS = require('./constants.json');

// const SUB_PROF_TEMPLATE = [
//     'frn:field::SubProfileFullName',
//     'frn:field::SubProfileEmail',
//     'frn:field::SubProfileMobile',
//     'frn:field::SubProfileAddress',
// ];

// const CRED_TEMPLATE = [
//     'frn:field::CredName',
//     'frn:field::CredSig',
// ];

// const CRED_PROV_SUB_PROF_LINK = 'frn:field::ProviderSubjectLink';

// const CRED_PROV_TEMPLATE = [ 'frn:field::CredProviderName' ];

module.exports = Object.assign({
        CRED_PROVIDER_ROOT: 'frn:entity::credentialProviderParent2',
        CRED_PROV_NAME: 'cvverity-cpNode',
        CRED_PROV_NODE: 'frn:entity::cvverity-cpNode',
        SUB_PROFILE_NODE_NAME: 'cvverity-subProfile',
        SUB_PROFILE_NODE: 'frn:entity::cvverity-subProfile',
    },
    CONSTANTS);

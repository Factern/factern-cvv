'use strict';

const CONSTANTS = require('./constants.json');

module.exports = Object.assign({
        CRED_PROVIDER_ROOT: 'frn:entity::credentialProviderParent2',
        CRED_PROV_NAME: 'cvverify-cpNode',
        CRED_PROV_NODE: 'frn:entity::cvverify-cpNode',
        SUB_PROFILE_NODE_NAME: 'cvverify-subProfile',
        SUB_PROFILE_NODE: 'frn:entity::cvverify-subProfile',
    },
    CONSTANTS);

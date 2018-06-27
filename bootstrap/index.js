#!/usr/bin/env node

const program = require('commander');
const FacternClient = require('factern_api_version_2/dist/factern-client-bundle');
const fs = require('fs');

program
    .option('-j, --jwt [jwt]', 'Auth0 access token')
    .option('-l, --login [login]', 'Factern login ID ')
    .option('-n, --name [name]', 'Name of the Credential Provider')
    .parse(process.argv);

const { jwt, login, name } = program;

if (!jwt) {
    console.log('Please specify JWT');
    process.exit(1);
}
if (!login) {
    console.log('Please specify Factern login ID');
    process.exit(1);
}
if (!name) {
    console.log('Please specify name of Credential Provider');
    process.exit(1);
}

console.log(`${jwt} ${login} ${name}`);

const apiClient = FacternClient.ApiClient.instance;
const factsApi = new FacternClient.FactsApi();
const oauth2 = apiClient.authentications['OAuth2'];
oauth2.accessToken = jwt;

function callApi(method, body) {
    return factsApi[method]({ body, login, representing: login})
        .catch(err => console.log(`Error during ${method} on ${JSON.stringify(body)}, ${err}`));
}

function createField(name, searchable, uniqueByParent) {
    return callApi('createField', { name, searchable, uniqueByParent, branch: false })
        .then(node => node.data.nodeId)
        .then(nodeId => callApi('permission', {
                targetNodeId: nodeId,
                policy: {
                    effect: 'Allow',
                    actions: ['Read'],
                }
            }
            ).then(() => nodeId)
        );
}

function createEntity(name) {
    return callApi('createEntity', { name })
        .then(node => node.data.nodeId)
        .then(nodeId => callApi('permission', {
                targetNodeId: nodeId,
                policy: {
                    effect: 'Allow',
                    actions: ['Read'],
                }
            }
        ).then(() => nodeId));
}

const entities = [
    createEntity('cvverify-cpNode'),
];

const fields = [
    createField('CredProviderName', true, true),
    createField('ProviderSubjectLink', true, true),
    createField('CredName', true, false),
    createField('CredSig', true, false),
    createField('SubProfileFullName', true, true),
    createField('SubProfileEmail', true, true),
    createField('SubProfileMobile', true, true),
    createField('SubProfileAddress', true, true),
];

Promise.all([...entities, ...fields])
    .then(values => {
        const [cpNode, cpName, psLink, credName, credSig, spFullName, spEmail, spMobile, spAddress] = values;
        const toExport = {
            CRED_PROV_ID: cpNode,
            CRED_PROV_TEMPLATE: [cpName],
            CRED_TEMPLATE: [credName, credSig],
            CRED_PROV_SUB_PROF_LINK: psLink,
            SUB_PROF_TEMPLATE: [spFullName, spEmail, spMobile, spAddress],
        };
        fs.writeFile("./constants.json", JSON.stringify(toExport, null, 2), 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }

            console.log(`The file was saved ${JSON.stringify(toExport)}!`);
            process.exit(0);
        });

    })
    .catch(err => console.log(`Error making factern request: ${err}`));

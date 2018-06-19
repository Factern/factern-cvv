'use strict';

const FacternClient = require('factern_api_version_2/dist/factern-client-bundle');
const auth0 = require('../auth/auth0');

const apiClient = FacternClient.ApiClient.instance;
const factsApi = new FacternClient.FactsApi();
const oauth2 = apiClient.authentications['OAuth2'];

function factern(token) {
    oauth2.accessToken = token;
    return factsApi
}


function autoRefreshToken(method, body) {
    const data = { body: body, login: auth0.loginId, representing: auth0.loginId };

    return auth0.getCachedAuth0Token()
        .then((token) => factern(token)[method](data))
        .catch(() => {
            return auth0.getAuth0Token()
                .then((token) => {
                    return factern(token)[method](data);
                })
        });
}

// ToDo: auto refresh token after expiry
function getAnonymousAuth() {
    return auth0.getCachedAuth0Token()
        .then(accessToken => ({ accessToken, login: auth0.loginId }))
}

function withToken(method, body, auth) {
    const data = { body };

    return factern(auth.accessToken)[method](data)
        .catch(err => {
            console.log(`Error making factern request /${method} body: ${JSON.stringify(body)} error: ${JSON.stringify(err)}`)
            throw err;
        })
}

module.exports = {
    autoRefreshToken,
    withToken,
    getAnonymousAuth,
};

'use strict';

const axios = require('axios');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const loginId = process.env.LOGIN_ID;
const authServer = 'https://factern-test.eu.auth0.com/oauth/token';

let JWT;

const refreshAuth0Token = () => {
    console.log('getting auth token');
    const body = {
        'client_id': clientId,
        'client_secret': clientSecret,
        'audience': 'https://api.factern.com',
        'grant_type': 'client_credentials'
    };

    return axios({
        method: 'POST',
        url: authServer,
        headers: {
            'Content-Type': 'application/json',
        },
        data: body
    })
        .then((resp) => {
            JWT = resp.data.access_token;
            return JWT;
        })
        .catch((err) => err);
};

const getCachedAuth0Token = () => {
    return JWT ? Promise.resolve(JWT) : refreshAuth0Token();
};

module.exports = {
    getAuth0Token: refreshAuth0Token,
    getCachedAuth0Token: getCachedAuth0Token,
    loginId: loginId,
};

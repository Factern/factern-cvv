import auth0 from 'auth0-js';

import { Auth0Consts, FacternPaths, AppPaths } from '../constants/enums';

export default class Auth0 {
  auth0 = new auth0.WebAuth({
    domain: FacternPaths.auth0Domain,
    clientID: Auth0Consts.clientId,
    audience: FacternPaths.auth0Audience,
    scope: 'openid email profile',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(signUp = false) {
    this.auth0.authorize({
      redirectUri: `${AppPaths.origin}/auth`,
      responseType: 'token id_token',
      initialScreen: signUp ? 'signUp' : 'login',
    });
  }

  logout() {
    this.auth0.logout({
      returnTo: `${AppPaths.origin}/login`,
      federated: true,
    });
  }
}


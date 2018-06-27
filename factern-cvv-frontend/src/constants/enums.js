export const FacternPaths = Object.freeze({
  auth0Domain: 'factern-test.eu.auth0.com',
  auth0Audience: 'https://api.factern.com',
});

export const Auth0Consts = Object.freeze({
  clientId: 'gNYWScJCmI84GkqKw21QlqbgEzbOHv9v',
});

const { origin } = window.location; // Note: we may want to lock this down to https://portal.factern.com domain
const { pathname } = window.location;
const home = `${origin}${pathname}`;

export const AppPaths = Object.freeze({
  home,
  origin,
});

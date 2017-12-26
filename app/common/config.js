
let config = {};

if (__CLIENT__ && window && window.__CONFIG__ && !__DEV__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {} // eslint-disable-line
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME = typeof window !== 'undefined' ? window.location.origin : (config.HOSTNAME || 'http://localhost:8080');

export const API_ENDPOINT = config.API_ENDPOINT || process.env.API_ENDPOINT || 'https://dev.ehealth.world/api/uaddresses';
export const AUTH_ENDPOINT = config.AUTH_ENDPOINT || process.env.AUTH_ENDPOINT || 'https://dev.ehealth.world';

export const SITEMAP_HOSTNAME = process.env.SITEMAP_HOSTNAME || 'https://uaddresses.herokuapp.com'; // used in sitemap
export const LANG_COOKIE_NAME = 'lang';

export const AUTH_COOKIE_NAME = config.AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME || 'authorization';

export const CLIENT_ID = config.CLIENT_ID || process.env.CLIENT_ID || '0423bab7-4aa0-475f-a6a8-46738524eaf7';
export const SCOPES = config.SCOPES || process.env.SCOPES || 'address:read address:write';
export const OAUTH_URL = config.OAUTH_URL || process.env.OAUTH_URL || 'http://auth.dev.ehealth.world/sign-in';
export const OAUTH_REDIRECT_PATH = config.OAUTH_REDIRECT_PATH || process.env.OAUTH_REDIRECT_PATH || '/auth/redirect';
export const OAUTH_REDIRECT_URL = config.OAUTH_REDIRECT_URL || process.env.OAUTH_REDIRECT_URL || `${HOSTNAME}${OAUTH_REDIRECT_PATH}`;

export const PUBLIC_INDEX_ROUTE = '/sign-in';
export const PRIVATE_INDEX_ROUTE = '/regions';

export const API_PROXY_PATH = '/api';

// for internal app usage. for example for XHR requests or server side rendering
export const API_URL = __CLIENT__ ? API_PROXY_PATH : API_ENDPOINT;

import React, { useContext } from 'react';
import { AuthContext, type IAuthContext, type TAuthConfig } from 'react-oauth2-code-pkce';

// Get info from http://localhost:8080/realms/test/.well-known/openid-configuration

export const authConfig: TAuthConfig = {
  clientId: 'suuku-frontend',
  authorizationEndpoint: 'http://localhost:9080/realms/suuku-realm/protocol/openid-connect/auth',
  logoutEndpoint: 'http://localhost:9080/realms/suuku-realm/protocol/openid-connect/logout',
  tokenEndpoint: 'http://localhost:9080/realms/suuku-realm/protocol/openid-connect/token',
  redirectUri: 'http://localhost:9000/',
  scope: 'profile email offline_access',
  // Example to redirect back to original path after login has completed
  // preLogin: () => localStorage.setItem('preLoginPath', window.location.pathname),
  // postLogin: () => window.location.replace(localStorage.getItem('preLoginPath') || ''),
  decodeToken: true,
  autoLogin: false,
};

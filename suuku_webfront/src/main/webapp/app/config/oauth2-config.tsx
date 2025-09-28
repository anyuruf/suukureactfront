import React, { useContext } from 'react';
import { AuthContext, type IAuthContext, type TAuthConfig } from 'react-oauth2-code-pkce';

// Get info from http://localhost:8080/realms/test/.well-known/openid-configuration

export const authConfig: TAuthConfig = {
  clientId: 'account',
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

export function LoginInfo(): JSX.Element {
  const { tokenData, token, logIn, logOut, error }: IAuthContext = useContext(AuthContext);

  if (error) {
    return (
      <>
        <div style={{ color: 'red' }}>An error occurred during authentication: {error}</div>
        <button onClick={() => logOut()}>Log out</button>
      </>
    );
  }

  return (
    <>
      {token ? (
        <>
          <div>
            <h4>Access Token (JWT)</h4>
            <pre
              style={{
                width: '400px',
                margin: '10px',
                padding: '5px',
                border: 'black 2px solid',
                wordBreak: 'break-all',
                whiteSpace: 'break-spaces',
              }}
            >
              {token}
            </pre>
          </div>
          <div>
            <h4>Login Information from Access Token (Base64 decoded JWT)</h4>
            <pre
              style={{
                width: '400px',
                margin: '10px',
                padding: '5px',
                border: 'black 2px solid',
                wordBreak: 'break-all',
                whiteSpace: 'break-spaces',
              }}
            >
              {JSON.stringify(tokenData, null, 2)}
            </pre>
          </div>
          <button onClick={() => logOut()}>Log out</button>
        </>
      ) : (
        <>
          <div>You are not logged in.</div>
          <button onClick={() => logIn()}>Log in</button>
        </>
      )}
    </>
  );
}

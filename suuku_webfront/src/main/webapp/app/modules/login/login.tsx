import React from 'react';
import { useContext } from 'react';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import { Button } from 'reactstrap';

export const LoginPage = () => {
  const { logIn }: IAuthContext = useContext(AuthContext);
  return <Button onClick={() => logIn()}>Sign in</Button>;
};

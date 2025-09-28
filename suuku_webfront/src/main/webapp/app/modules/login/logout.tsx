import React, { useContext, useEffect } from 'react';

import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

export const Logout = () => {
  const { logOut }: IAuthContext = useContext(AuthContext);

  useEffect(() => {
    // Trigger OIDC logout right away
    logOut();
  }, [logOut]);

  return (
    <div className="p-5">
      <h4>Logged out successfully!</h4>
    </div>
  );
};

export default Logout;

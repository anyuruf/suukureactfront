import { useEffect } from 'react';
import { REDIRECT_URL } from 'app/shared/util/url-utils';
import { useLocation } from 'react-router';

export const LoginRedirect = () => {
  const pageLocation = useLocation();

  useEffect(() => {
    const redirectPath = pageLocation.state?.from?.pathname || '/';
    localStorage.setItem(REDIRECT_URL, redirectPath);
    window.location.href = '/oauth2/authorization/oidc';
  }, [pageLocation]);

  // nothing to render; user is being redirected
  return null;
};
export default LoginRedirect;

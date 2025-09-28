import React, { useContext } from 'react';
import { Navigate, PathRouteProps, useLocation } from 'react-router-dom';
import { Translate } from 'react-jhipster';

import ErrorBoundary from 'app/shared/error/error-boundary';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';

interface IOwnProps extends PathRouteProps {
  hasAnyAuthorities?: string[];
  children: React.ReactNode;
}

export const PrivateRoute = ({ children, hasAnyAuthorities = [], ...rest }: IOwnProps) => {
  const { tokenData, token }: IAuthContext = useContext(AuthContext);
  const isAuthenticated = Boolean(token);
  const userRoles: string[] = tokenData?.realm_access?.roles || [];

  const isAuthorized = hasAnyAuthorities.length === 0 || hasAnyAuthorities.some(role => userRoles.includes(role));
  const pageLocation = useLocation();

  if (!children) {
    throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: '/sign-in',
          search: pageLocation.search,
        }}
        replace
        state={{ from: pageLocation }}
      />
    );
  }

  if (isAuthenticated) {
    if (isAuthorized) {
      return <ErrorBoundary>{children}</ErrorBoundary>;
    }

    return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">
          <Translate contentKey="error.http.403">You are not authorized to access this page.</Translate>
        </div>
      </div>
    );
  }
};

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some(auth => authorities.includes(auth));
  }
  return false;
};

/**
 * Checks authentication before showing the children and redirects to the
 * login page if the user is not authenticated.
 * If hasAnyAuthorities is provided the authorization status is also
 * checked and an error message is shown if the user is not authorized.
 */
export default PrivateRoute;

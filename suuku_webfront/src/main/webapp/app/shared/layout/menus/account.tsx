import React, { MouseEventHandler, useContext } from 'react';
import { Button, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { AuthContext, IAuthContext } from 'react-oauth2-code-pkce';
import MenuItem from './menu-item';

const accountMenuItemsAuthenticated = (logOut: MouseEventHandler<HTMLElement>) => {
  return (
    <>
      <MenuItem icon="sign-out-alt" onClick={logOut} data-cy="logout">
        <Translate contentKey="global.menu.account.logout">Sign out</Translate>
      </MenuItem>
    </>
  );
};

const accountMenuItems = (logIn: MouseEventHandler<HTMLElement>) => {
  return (
    <>
      <DropdownItem id="login-item" onClick={logIn} data-cy="login">
        <FontAwesomeIcon icon="sign-in-alt" /> <Translate contentKey="global.menu.account.login">Sign in</Translate>
      </DropdownItem>
    </>
  );
};

export const AccountMenu = ({ isAuthenticated = false, logIn, logOut }) => (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu" data-cy="accountMenu" container="body">
    {isAuthenticated && accountMenuItemsAuthenticated(logOut)}
    {!isAuthenticated && accountMenuItems(logIn)}
  </NavDropdown>
);

export default AccountMenu;

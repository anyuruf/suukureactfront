import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = (logOut: () => void) => (
  <>
    <MenuItem icon="sign-out-alt" onClick={logOut()} data-cy="logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = (logIn: () => void) => {
  return (
    <>
      <DropdownItem id="login-item" onClick={logIn()} data-cy="login">
        <FontAwesomeIcon icon="sign-in-alt" /> <Translate contentKey="global.menu.account.login">Sign in</Translate>
      </DropdownItem>
    </>
  );
};

export const AccountMenu = ({ isAuthenticated = false, logOut, logIn }) => (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu" data-cy="accountMenu">
    {isAuthenticated && accountMenuItemsAuthenticated(logOut)}
    {!isAuthenticated && accountMenuItems(logIn)}
  </NavDropdown>
);

export default AccountMenu;

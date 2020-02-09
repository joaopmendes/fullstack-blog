import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
} from 'mdbreact';
import { logout } from '../../Store/Auth/auth.actions';
import { StyledNavLink, UserImage, UserName } from './navbar.styles';

export const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <MDBNavbar color="white" light expand="md">
      <MDBContainer>
        <MDBNavbarBrand>
          <StyledNavLink to="/">
            <strong>Fullstack Blog</strong>
          </StyledNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem active>
              <StyledNavLink to="/">Feed</StyledNavLink>
            </MDBNavItem>
          </MDBNavbarNav>

          {auth.userLoggedIn ? (
            <>
              <MDBNavItem style={{ listStyle: 'none' }}>
                <StyledNavLink to="/manage">Manage Posts</StyledNavLink>
              </MDBNavItem>
              <MDBNavItem style={{ listStyle: 'none' }}>
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <UserName>{auth.user.name}</UserName>
                    <UserImage
                      src={`http://localhost:3000/${auth.user.profilePicture}`}
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem>
                      <StyledNavLink to="#!">Your Profile</StyledNavLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <StyledNavLink to="#!" onClick={logoutUser}>
                        Logout
                      </StyledNavLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </>
          ) : (
            <>
              <MDBNavItem style={{ listStyle: 'none' }}>
                <StyledNavLink to="/login">Login</StyledNavLink>
              </MDBNavItem>
              <MDBNavItem style={{ listStyle: 'none' }}>
                <StyledNavLink to="/register">Sign in</StyledNavLink>
              </MDBNavItem>
            </>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

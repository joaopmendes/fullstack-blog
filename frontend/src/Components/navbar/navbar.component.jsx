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
  MDBNavItem,
  MDBHamburgerToggler,
  MDBNavLink,
} from 'mdbreact';
import { logout } from '../../Store/Auth/auth.actions';

export const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <MDBNavbar color="white lighten-4" light>
      <MDBContainer>
        <MDBNavbarBrand style={{ color: 'black' }}>
          <MDBNavLink style={{ margin: '0' }} to="/">
            FullStack Blog
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBHamburgerToggler
          color="#2196f3"
          style={{ margin: 0 }}
          id="hamburger1"
          onClick={() => setIsOpen(!isOpen)}
        />
        <MDBCollapse isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            {auth.userLoggedIn ? (
              <>
                {auth.user.isAdmin && (
                  <MDBNavItem style={{ listStyle: 'none' }}>
                    <MDBNavLink to="/admin/dashboard">Admin Panel</MDBNavLink>
                  </MDBNavItem>
                )}

                <MDBNavItem style={{ listStyle: 'none' }}>
                  <MDBNavLink to="/manage-posts">Manage Posts</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ listStyle: 'none' }}>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2">{auth.user.name}</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem>
                        <MDBNavLink to="/manage">Your Profile</MDBNavLink>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <MDBNavLink
                          to=""
                          onClick={() => {
                            logoutUser();
                            console.log('teste');
                          }}
                        >
                          Logout
                        </MDBNavLink>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </>
            ) : (
              <>
                <MDBNavItem style={{ listStyle: 'none' }}>
                  <MDBNavLink to="/login">Login</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ listStyle: 'none' }}>
                  <MDBNavLink to="/register">Sign in</MDBNavLink>
                </MDBNavItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

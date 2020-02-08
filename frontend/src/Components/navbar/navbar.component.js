import React, {useState} from 'react';
import {
    Avatar,
    NavbarLink,
    NavbarLinkWrapper,
    NavbarLogo,
    NavbarLogoWrapper,
    NavbarMenuRight,
    NavbarWrapper,
} from "./navbar.styles";
import {Container} from "../../globa.styles";
import {useSelector} from "react-redux";
import {
    MDBCollapse, MDBContainer,
    MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink
} from "mdbreact";

export const Navbar = () => {
    const auth = useSelector(store => store.auth);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <MDBNavbar color="white" light  expand="md">
            <MDBContainer>
                <MDBNavbarBrand>
                    <strong >Fullstack Blog</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)}/>
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem active>
                            <MDBNavLink to="#!">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#!">Features</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#!">Pricing</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavItem style={{listStyle: "none"}}>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <Avatar />
                                <MDBIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default">
                                <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};
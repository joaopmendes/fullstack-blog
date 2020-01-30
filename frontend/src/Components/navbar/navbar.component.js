import React from 'react';
import {
    NavbarLink,
    NavbarLinkWrapper,
    NavbarLogo,
    NavbarLogoWrapper,
    NavbarMenuRight,
    NavbarWrapper,
} from "./navbar.styles";
import {Container} from "../../globa.styles";

export const Navbar = ({}) => {
    return (
        <Container>
            <NavbarWrapper>
                <NavbarLogoWrapper>
                    <NavbarLogo to={"/"}>
                        Fullstack blog
                    </NavbarLogo>
                </NavbarLogoWrapper>
                <NavbarMenuRight>
                    <NavbarLinkWrapper>
                        <NavbarLink to={"/"}>Feed</NavbarLink>
                    </NavbarLinkWrapper>
                    <NavbarLinkWrapper>
                        <NavbarLink activeStyle={{textDecoration: "underline"}} to={"/login"}>Login</NavbarLink>
                    </NavbarLinkWrapper>
                    <NavbarLinkWrapper>
                        <NavbarLink activeStyle={{textDecoration: "underline"}} to={"/register"}>Register</NavbarLink>
                    </NavbarLinkWrapper>
                </NavbarMenuRight>
            </NavbarWrapper>
        </Container>
    );
}
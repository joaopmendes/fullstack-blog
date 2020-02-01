import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const NavbarWrapper = styled.header`
  display: flex;
  padding: 1.3rem;
  background-color: white ;
`;
export const NavbarLogoWrapper = styled.div`
  
`;

export const NavbarLogo = styled(NavLink)`
   font-size: 1.3rem;
   font-weight: 900;
   margin: auto 0;
   padding: 0;
   color: ${props => props.theme.dark}
`;

export const NavbarMenu = styled.ul`
   list-style: none;
   margin: 0 auto;
`;
export const NavbarMenuRight = styled.ul`
   list-style: none;
   justify-content: flex-end;
   margin: auto 0 0 auto;

`;

export const NavbarLinkWrapper = styled.li`
    display: inline-flex;
    height: 100%;
    font-size: 1rem;
    margin: auto 1rem;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.dark}
`;

export const NavbarLink = styled(NavLink)`
  color: ${props => props.theme.dark};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline ;
  }
`;
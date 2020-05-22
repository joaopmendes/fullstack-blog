import React from 'react';
import {MDBContainer} from "mdbreact";
import {Navbar} from "../navbar/navbar.component";

export const BlogLayoutComponent = ({children}) => {
    return (
        <>
            <Navbar/>
            <MDBContainer>
                {children}
            </MDBContainer>
        </>
    );
};

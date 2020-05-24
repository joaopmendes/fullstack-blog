import React from 'react';
import { MDBContainer } from 'mdbreact';
import { Navbar } from '../navbar/navbar.component';
import Loader from '../Loader/loader.component';

export const BlogLayoutComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <MDBContainer>
        <Loader />
        {children}
      </MDBContainer>
    </>
  );
};

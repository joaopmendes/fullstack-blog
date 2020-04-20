import React from 'react';
import { MDBCard, MDBCardBody } from 'mdbreact';
const CardWrapperComponent = ({ children }) => {
  return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>{children}</MDBCardBody>
    </MDBCard>
  );
};

export default CardWrapperComponent;

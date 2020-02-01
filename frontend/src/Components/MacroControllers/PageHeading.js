import React from 'react';
import styled from "styled-components";

export const PageHeading = ({title}) => {
    return (
        <StyledPageHeading>{title}</StyledPageHeading>
    );
}
const StyledPageHeading = styled.h1`
  text-align: center;
  margin: 1em auto;
`
import React from 'react';
import styled from "styled-components"
export const FormWrapper = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  width: 60%;
  margin: 1em auto;
  
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and  (max-width: 1366px){
    width: 80%;
  }
`;
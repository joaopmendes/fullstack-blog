import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.div`
  width: 60%;
  margin: 1em auto;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1366px) {
    width: 80%;
  }
`;

FormWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
export { FormWrapper };

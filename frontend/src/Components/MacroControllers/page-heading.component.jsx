import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageHeading = ({ title }) => (
  <StyledPageHeading>{title}</StyledPageHeading>
);
const StyledPageHeading = styled.h1`
  text-align: center;
  margin: 1em auto;
`;
PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

export { PageHeading };

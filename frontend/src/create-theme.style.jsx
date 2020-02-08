import { ThemeProvider } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const theme = {
  success: '#379951',
  danger: '#91313F',
  dark: '#1D262B',
  purple: '#483B56',
  blue: '#5F54FF',
  orange: '#FF8552',
};
export const StyledTheme = ({ children }) => (
  <>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);
StyledTheme.propTypes = {
  children: PropTypes.element.isRequired,
};

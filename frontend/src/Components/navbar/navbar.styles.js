import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  color: black;
  margin: 0 1rem;
  &:hover {
    color: ${(props) => props.theme.danger};
  }
`;

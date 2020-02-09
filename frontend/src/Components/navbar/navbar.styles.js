import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const UserImage = styled.img`
  max-width: 30px;
  height: 30px;
  border-radius: 50%;
`;
export const UserName = styled.p`
  display: inline;
  margin: 0 0.3rem;
  color: black;
  &:hover {
    color: ${(props) => props.theme.danger};
  }
`;
export const StyledNavLink = styled(NavLink)`
  color: black;
  margin: 0 1rem;
  &:hover {
    color: ${(props) => props.theme.danger};
  }
`;

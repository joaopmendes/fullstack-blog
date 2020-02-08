import React from 'react';
import styled from 'styled-components';

export const Button = ({
  type,
  onClick,
  disabled,
  children,
  size,
  backgroundColor,
  ...rest
}) => {
  let render;

  switch (type) {
    case 'anchor':
      render = (
        <StyledAnchor
          onClick={onClick}
          disabled={disabled}
          size={size}
          backgroundColor={backgroundColor}
          {...rest}
        >
          {children}
        </StyledAnchor>
      );
      break;
    case 'button':
      render = (
        <StyledButton
          onClick={onClick}
          disabled={disabled}
          size={size}
          backgroundColor={backgroundColor}
          {...rest}
        >
          {children}
        </StyledButton>
      );
      break;
    default:
      render = (
        <StyledButton
          onClick={onClick}
          disabled={disabled}
          size={size}
          backgroundColor={backgroundColor}
          {...rest}
        >
          {children}
        </StyledButton>
      );
  }
  return render;
};
const StyledAnchor = styled.button`
  display: block;
  padding: ${(props) => (props.size === 'big' ? '.5rem 2rem' : '.5rem 1.5rem')};
  color: white;
  background: ${(props) => props.theme[props.backgroundColor]};
  outline: none;
  cursor: pointer;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 400;
  border: 2px solid ${(props) => props.theme[props.backgroundColor]};
  text-transform: uppercase;

  &:hover {
    background: white;
    transition: 0.2s;
    border-color: ${(props) => props.theme[props.backgroundColor]};
    color: ${(props) => props.theme[props.backgroundColor]};
  }
  &:disabled {
    opacity: 60%;
    &:hover {
      background: ${(props) => props.theme[props.backgroundColor]};
      transition: none;
      border: 2px solid ${(props) => props.theme[props.backgroundColor]};
      color: white;
      cursor: unset;
    }
  }
`;
const StyledButton = styled.button`
  display: block;
  padding: ${(props) => (props.size === 'big' ? '.5rem 2rem' : '.5rem 1.5rem')};
  color: white;
  background: ${(props) => props.theme[props.backgroundColor]};
  outline: none;
  cursor: pointer;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 400;
  border: 2px solid ${(props) => props.theme[props.backgroundColor]};
  text-transform: uppercase;

  &:hover {
    background: white;
    transition: 0.2s;
    border-color: ${(props) => props.theme[props.backgroundColor]};
    color: ${(props) => props.theme[props.backgroundColor]};
  }
  &:disabled {
    opacity: 60%;
    &:hover {
      background: ${(props) => props.theme[props.backgroundColor]};
      transition: none;
      border: 2px solid ${(props) => props.theme[props.backgroundColor]};
      color: white;
      cursor: unset;
    }
  }
`;

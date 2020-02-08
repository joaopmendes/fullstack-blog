import React from 'react';
import uuid from 'uuid';
import { FaCheck } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

import {
  ErrorMessage,
  Icon,
  InputField,
  InputGroup,
  InputInfo,
  InputLabel,
  InputWrapper,
} from './macro.styles';

const InputText = ({
  resetField,
  touched,
  PrefixIcon,
  name,
  minLength,
  maxLength,
  type,
  label,
  onChange,
  value,
  error,
  errorMessage,
  regex,
  onBlur,
  displayErrorWhenImTrue,
  placeholder,
  ...rest
}) => {
  const id = uuid();
  return (
    <InputGroup>
      <InputLabel error={error} touched={touched} htmlFor={id}>
        {label}
      </InputLabel>
      <InputWrapper error={error} touched={touched}>
        {PrefixIcon && (
          <InputInfo error={error} touched={touched}>
            <PrefixIcon />
          </InputInfo>
        )}

        <InputField
          placeholder={placeholder}
          value={value}
          name={name}
          id={id}
          type={type}
          {...rest}
          onBlur={onBlur}
          onChange={onChange}
        />
        <Icon error={error && touched}>
          {!error && touched && <FaCheck />}
          {error && touched && <MdClose onClick={resetField} />}
        </Icon>
      </InputWrapper>
      {error && touched && !displayErrorWhenImTrue && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      {displayErrorWhenImTrue && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputGroup>
  );
};

InputText.defaultProps = {
  resetField: () => {},
  PrefixIcon: null,
  minLength: 0,
  maxLength: undefined,
  type: 'text',
  label: '',
  error: false,
  errorMessage: '',
  regex: '',
  onBlur: () => {},
  displayErrorWhenImTrue: false,
  placeholder: '',
};

InputText.propTypes = {
  resetField: PropTypes.func,
  touched: PropTypes.bool.isRequired,
  PrefixIcon: PropTypes.element,
  name: PropTypes.string.isRequired,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  regex: PropTypes.string,
  onBlur: PropTypes.func,
  displayErrorWhenImTrue: PropTypes.bool,
  placeholder: PropTypes.string,
};

export { InputText };

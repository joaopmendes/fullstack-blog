import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../MacroControllers/macro.styles';
import { WrapperSubmitButton } from '../../global.styles';
import { Button } from '../MacroControllers/Button';
import LoginFields from './LoginFields';

const LoginForm = ({
  errors,
  values,
  handleChange,
  setFieldValue,
  handleBlur,
  touched,
  isSubmitting,
  isValid,
  handleSubmit,
  serverError,
}) => (
  <form onSubmit={handleSubmit}>
    <LoginFields
      errors={errors}
      values={values}
      handleChange={handleChange}
      setFieldValue={setFieldValue}
      handleBlur={handleBlur}
      touched={touched}
    />
    {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
    <WrapperSubmitButton>
      <Button
        backgroundColor={isValid ? 'success' : 'danger'}
        disabled={!isValid || isSubmitting}
      >
        Login
      </Button>
    </WrapperSubmitButton>
  </form>
);
LoginForm.propTypes = {
  errors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  serverError: PropTypes.string.isRequired,
};
export default LoginForm;

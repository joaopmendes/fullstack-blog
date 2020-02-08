import React from 'react';
import PropTypes from 'prop-types';
import { WrapperSubmitButton } from '../../global.styles';
import { Button } from '../MacroControllers/Button';
import RegisterFields from './RegisterFields';

const RegisterForm = ({
  errors,
  values,
  handleChange,
  setFieldValue,
  handleBlur,
  touched,
  isSubmitting,
  isValid,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <RegisterFields
      errors={errors}
      values={values}
      handleChange={handleChange}
      setFieldValue={setFieldValue}
      handleBlur={handleBlur}
      touched={touched}
    />
    <WrapperSubmitButton>
      <Button backgroundColor={isValid ? 'success' : 'danger'} disabled={!isValid || isSubmitting}>
        Register
      </Button>
    </WrapperSubmitButton>
  </form>
);
RegisterForm.propTypes = {
  errors: PropTypes.shape.isRequired,
  values: PropTypes.shape.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default RegisterForm;

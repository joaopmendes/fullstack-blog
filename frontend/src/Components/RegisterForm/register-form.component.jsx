import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { WrapperSubmitButton } from '../../global.styles';
import { Button } from '../MacroControllers/button.component';
import RegisterFields from './register-field.component';
import { MDBAlert } from 'mdbreact';

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
  serverError,
}) => {
  const [error, setError] = useState(serverError);
  useEffect(() => {
    setError(serverError);
  }, [serverError]);
  return (
    <>
      {error && (
        <MDBAlert
          color="danger"
          dismiss
          onClose={() => {
            setError('');
          }}
        >
          {error}
        </MDBAlert>
      )}
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
          <Button
            backgroundColor={isValid ? 'success' : 'danger'}
            disabled={!isValid || isSubmitting}
          >
            Register
          </Button>
        </WrapperSubmitButton>
      </form>
    </>
  );
};
RegisterForm.defaultProps = {
  serverError: '',
};
RegisterForm.propTypes = {
  errors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
};

export default RegisterForm;

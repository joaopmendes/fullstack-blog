import React from 'react';
import { FaCog, MdEmail } from 'react-icons/all';
import PropTypes from 'prop-types';
import { InputText } from '../MacroControllers/InputText';

const LoginFields = ({
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}) => (
  <>
    <InputText
      PrefixIcon={MdEmail}
      errorMessage={errors.email}
      error={Boolean(errors.email)}
      touched={touched.email}
      label="Your Email"
      value={values.email}
      name="email"
      resetField={() => setFieldValue('email', '')}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <InputText
      PrefixIcon={FaCog}
      type="password"
      errorMessage={errors.password}
      error={Boolean(errors.password)}
      resetField={() => setFieldValue('password', '')}
      touched={touched.password}
      label="Your password"
      value={values.password}
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </>
);
LoginFields.defaultProps = {
  errors: {},
  touched: {},
};
LoginFields.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.object,
};
export default LoginFields;

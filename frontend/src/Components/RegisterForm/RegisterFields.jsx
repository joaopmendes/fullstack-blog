import React from 'react';
import PropTypes from 'prop-types';
import { FaCog, MdContacts, MdEmail } from 'react-icons/all';
import { InputText } from '../MacroControllers/InputText';
import { FileInput } from '../MacroControllers/FileInput';

const RegisterFields = ({
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}) => (
  <>
    <InputText
      PrefixIcon={MdContacts}
      errorMessage={errors.name}
      error={Boolean(errors.name)}
      touched={touched.name}
      label="Your Name"
      resetField={() => setFieldValue('name', '')}
      value={values.name}
      name="name"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <InputText
      PrefixIcon={MdEmail}
      errorMessage={errors.email}
      error={Boolean(errors.email)}
      touched={touched.email}
      label="Your Email"
      resetField={() => setFieldValue('email', '')}
      value={values.email}
      name="email"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <InputText
      PrefixIcon={FaCog}
      type="password"
      errorMessage={errors.password}
      resetField={() => setFieldValue('password', '')}
      error={Boolean(errors.password)}
      touched={touched.password}
      label="Your password"
      value={values.password}
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <InputText
      PrefixIcon={FaCog}
      type="password"
      errorMessage={errors.confirmPassword}
      error={Boolean(errors.confirmPassword)}
      resetField={() => setFieldValue('confirmPassword', '')}
      touched={touched.confirmPassword}
      label="Confirm Password"
      value={values.confirmPassword}
      name="confirmPassword"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <FileInput
      onChange={(file) => setFieldValue('avatar', file)}
      value={values.avatar}
    />
  </>
);
RegisterFields.propTypes = {
  errors: PropTypes.shape.isRequired,
  values: PropTypes.shape.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
};
export default RegisterFields;

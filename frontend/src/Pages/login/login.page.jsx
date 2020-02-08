import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { PageHeading } from '../../Components/MacroControllers/PageHeading';
import { FormWrapper } from '../../Components/MacroControllers/FormWrapper';
import LoginForm from '../../Components/LoginForm/LoginForm';

const LoginPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email not valid.')
      .required('Email is required!'),
    password: Yup.string()
      .min(6, 'Password has to be longer than 6 characters!')
      .required('Password is required!'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const data = new FormData();
      data.append('email', values.email);
      data.append('password', values.password);
      axios
        .post('/api/login', data)
        .then(() => {
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  });
  const {
    errors,
    values,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
    isValid,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <>
      <PageHeading title="Login" />
      <FormWrapper>
        <LoginForm
          errors={errors}
          values={values}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
          touched={touched}
          isSubmitting={isSubmitting}
          isValid={isValid}
          handleSubmit={handleSubmit}
        />
      </FormWrapper>
    </>
  );
};

export default LoginPage;

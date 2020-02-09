import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { PageHeading } from '../../Components/MacroControllers/PageHeading';
import { FormWrapper } from '../../Components/MacroControllers/FormWrapper';
import LoginForm from '../../Components/LoginForm/LoginForm';
import { login } from '../../Store/Auth/auth.actions';

const LoginPage = () => {
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
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
      axios
        .post('/api/login', {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          setSubmitting(false);
          if (res.data.code === 200) {
            const payload = {
              name: res.data.user.name,
              email: res.data.user.email,
              accessToken: res.data.user.accessToken,
              posts: res.data.user.posts,
              profilePicture: res.data.user.profilePicture,
            };
            dispatch(login(payload));
            console.log(payload);
            setServerError('');
          } else {
            setServerError(res.data.errorMessage);
          }
          console.log(res);
        })
        .catch(() => {
          setServerError('Something bad happen. :(');
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
          serverError={serverError}
        />
      </FormWrapper>
    </>
  );
};

export default LoginPage;

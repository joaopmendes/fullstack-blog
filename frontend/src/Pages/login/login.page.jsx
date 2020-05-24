import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { FormWrapper } from '../../Components/MacroControllers/form-wrapper.component';
import LoginFormComponent from '../../Components/LoginForm/login-form.component';
import { login } from '../../Store/Auth/auth.actions';
import { BlogLayoutComponent } from '../../Components/BlogLayout/blog-layout.component';
import CardWrapperComponent from '../../Components/CardWrapper/card-wrapper.component';
import CardWrapperHeaderComponent from '../../Components/CardWrapperHeader/card-wrapper-header.component';
import { useToasts } from 'react-toast-notifications';
import { addLoader, removeLoader } from '../../Store/Controls/controls.actions';
const LoginPage = () => {
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const { addToast } = useToasts();
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
      dispatch(addLoader('LOGIN'));
      axios
        .post('/api/login', {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          setSubmitting(false);
          if (res.data.code === 200) {
            dispatch(removeLoader('LOGIN'));

            const payload = {
              name: res.data.user.name,
              email: res.data.user.email,
              isAdmin: res.data.user.admin,
              accessToken: res.data.user.accessToken,
              posts: res.data.user.posts,
              profilePicture: res.data.user.profilePicture,
              // eslint-disable-next-line
              id: res.data.user._id,
            };
            dispatch(login(payload));
            addToast('Login Successfully', { appearance: 'success' });
            addToast(`You're being redirected...`, { appearance: 'info' });
            setServerError('');
          } else {
            dispatch(removeLoader('LOGIN'));
            setServerError(res.data.errorMessage);
          }
          console.log(res);
        })
        .catch(() => {
          setServerError('Something bad happen. :(');
          dispatch(removeLoader('LOGIN'));

          setSubmitting(false);
        });
    },
  });
  return (
    <BlogLayoutComponent>
      <CardWrapperComponent>
        <CardWrapperHeaderComponent title="Login" />
        <FormWrapper>
          <LoginFormComponent {...formik} serverError={serverError} />
        </FormWrapper>
      </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};

export default LoginPage;

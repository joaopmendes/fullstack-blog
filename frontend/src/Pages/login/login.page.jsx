import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { PageHeading } from '../../Components/MacroControllers/page-heading.component';
import { FormWrapper } from '../../Components/MacroControllers/form-wrapper.component';
import LoginFormComponent from '../../Components/LoginForm/login-form.component';
import { login } from '../../Store/Auth/auth.actions';
import { BlogLayoutComponent } from '../../Components/BlogLayout/blog-layout.component';
import CardWrapperComponent from "../../Components/CardWrapper/card-wrapper.component";
import CardWrapperHeaderComponent from "../../Components/CardWrapperHeader/card-wrapper-header.component";
import BlogPageBodyComponent from "../../Components/BlogPageBody/blog-page-body.component";

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
              isAdmin: res.data.user.admin,
              accessToken: res.data.user.accessToken,
              posts: res.data.user.posts,
              profilePicture: res.data.user.profilePicture,
              // eslint-disable-next-line
              id: res.data.user._id,
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
  return (
    <BlogLayoutComponent>
        <CardWrapperComponent>
          <CardWrapperHeaderComponent title="Login"/>
          <FormWrapper>
            <LoginFormComponent { ...formik  } serverError={serverError}/>
          </FormWrapper>
        </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};

export default LoginPage;

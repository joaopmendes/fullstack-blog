import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { FormWrapper } from '../../Components/MacroControllers/form-wrapper.component';
import { initialValues, validationSchema } from './register.config';
import { login } from '../../Store/Auth/auth.actions';
import RegisterForm from '../../Components/RegisterForm/register-form.component';
import { BlogLayoutComponent } from '../../Components/BlogLayout/blog-layout.component';
import CardWrapperComponent from '../../Components/CardWrapper/card-wrapper.component';
import CardWrapperHeaderComponent from '../../Components/CardWrapperHeader/card-wrapper-header.component';
import { useToasts } from 'react-toast-notifications';
import { registerUser } from '../../api/auth';
import { addLoader, removeLoader } from '../../Store/Controls/controls.actions';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState('');
  const { addToast } = useToasts();

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    dispatch(addLoader('REGISTER_USER_LOADER'));
    const { hasError, data, errorMessage } = await registerUser(values);
    dispatch(removeLoader('REGISTER_USER_LOADER'));

    setSubmitting(false);
    if (hasError) {
      addToast('Could not create user.', { appearance: 'error' });
      setServerError(errorMessage);
      return;
    }

    const payload = {
      name: data.user.name,
      email: data.user.email,
      accessToken: data.user.accessToken,
      posts: data.user.posts,
      profilePicture: data.user.profilePicture,
      // eslint-disable-next-line
      id: data.user._id,
    };
    setServerError('');

    addToast('Login Successfully', { appearance: 'success' });
    addToast(`You're being redirected...`, { appearance: 'info' });
    dispatch(login(payload));
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <BlogLayoutComponent>
      <CardWrapperComponent>
        <CardWrapperHeaderComponent title="Register" />
        <FormWrapper>
          <RegisterForm {...formik} serverError={serverError} />
        </FormWrapper>
      </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};

export default RegisterPage;

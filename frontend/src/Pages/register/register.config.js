import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email not valid.')
    .required('Email is required!'),
  name: Yup.string().required('Name is required!'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], "Passwords don't match"),
});
export const initialValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  avatar: null,
};

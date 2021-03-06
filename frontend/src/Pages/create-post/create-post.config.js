import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  subject: Yup.string()
    .required('Subject is required!')
    .min(3)
    .max(50),
  body: Yup.string().required('Body of post is required!'),
  tags: Yup.string().required('Tags are required!'),
});
export const initialValues = {
  subject: '',
  body: '',
  tags: '',
  thumbnail: null,
};

import React, { useState } from 'react';
import { BlogLayoutComponent } from '../../../Components/BlogLayout/blog-layout.component';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import CardWrapperComponent from '../../../Components/CardWrapper/card-wrapper.component';
import CardWrapperHeaderComponent from '../../../Components/CardWrapperHeader/card-wrapper-header.component';
import { FormWrapper } from '../../../Components/MacroControllers/form-wrapper.component';
import { initialValues, validationSchema } from '../post.config';
import CreatePostFormComponent from '../../../Components/CreatePostForm/create-post-form.component';
import { createPost } from '../../../api/blog';
import { updateUserData } from '../../../Store/Auth/auth.actions';
import { useToasts } from 'react-toast-notifications';
import { fetchPosts } from '../../../Store/Post/post.actions';
const CreatePostPage = () => {
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const toastManager = useToasts();
  const { user } = useSelector((store) => store.auth);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setSubmitting(false);
      const { hasError, errorMessage, data } = await createPost({
        token: user.accessToken,
        subject: values.subject,
        body: values.body,
        tags: values.tags,
        thumbnail: values.thumbnail,
      });

      if (hasError) {
        toastManager.addToast(errorMessage, { appearance: 'error' });
        setServerError(data?.errors?.[0] || '');
        console.log('CreatePostPage -> data', data);
      } else {
        toastManager.addToast('Post created successfully', {
          appearance: 'success',
        });
        dispatch(updateUserData());
        dispatch(fetchPosts());
      }
    },
  });
  return (
    <BlogLayoutComponent>
      <CardWrapperComponent>
        <CardWrapperHeaderComponent title="Create a Post" />
        <FormWrapper>
          <CreatePostFormComponent {...formik} serverError={serverError} />
        </FormWrapper>
      </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};
export default CreatePostPage;

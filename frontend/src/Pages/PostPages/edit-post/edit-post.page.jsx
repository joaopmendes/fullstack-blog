import React, { useState, useEffect } from 'react';
import { BlogLayoutComponent } from '../../../Components/BlogLayout/blog-layout.component';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import CardWrapperComponent from '../../../Components/CardWrapper/card-wrapper.component';
import CardWrapperHeaderComponent from '../../../Components/CardWrapperHeader/card-wrapper-header.component';
import { FormWrapper } from '../../../Components/MacroControllers/form-wrapper.component';
import {
  initialValues as initialValuesImported,
  validationSchema,
} from '../post.config';
import CreatePostFormComponent from '../../../Components/CreatePostForm/create-post-form.component';
import { createPost, editPost } from '../../../api/blog';
import { updateUserData } from '../../../Store/Auth/auth.actions';
import { useToasts } from 'react-toast-notifications';
import { fetchPosts } from '../../../Store/Post/post.actions';
import {
  addLoader,
  removeLoader,
} from '../../../Store/Controls/controls.actions';
const EditPostPage = ({
  history: { push },
  match: {
    params: { id },
  },
}) => {
  const [serverError, setServerError] = useState('');
  const [initialValues, setInitialValues] = useState(initialValuesImported);
  const dispatch = useDispatch();
  const toastManager = useToasts();

  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    const post = user.posts.find((post) => post._id === id);
    if (!post) {
      toastManager.addToast('You cannot change this post.', {
        appearance: 'error',
      });
      toastManager.addToast('Being redirected...', { appearance: 'info' });
      push('/');
    } else {
      setInitialValues({
        subject: post.subject,
        body: post.body,
        tags: post.tags
          .reduce((acc, curr) => acc.concat(curr.name), [])
          .join(', '),
        thumbnail: null,
      });
    }
  }, []);
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(addLoader('EDIT_POST'));
      const { hasError, errorMessage, data } = await editPost(
        user.accessToken,
        id,
        {
          subject: values.subject,
          body: values.body,
          tags: values.tags,
          thumbnail: values.thumbnail,
        },
      );
      dispatch(removeLoader('EDIT_POST'));

      setSubmitting(false);

      if (hasError) {
        toastManager.addToast(errorMessage, { appearance: 'error' });
        setServerError(errorMessage);
        console.log('[Edit Post] data', data);
      } else {
        toastManager.addToast('Post updated successfully', {
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
        <CardWrapperHeaderComponent title="Edit Post" />
        <FormWrapper>
          <CreatePostFormComponent
            {...formik}
            editMode
            serverError={serverError}
          />
        </FormWrapper>
      </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};
export default EditPostPage;

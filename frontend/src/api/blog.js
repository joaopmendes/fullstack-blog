import axios from 'axios';
import { PostActionTypes } from '../Store/Post/post.types';
import { login } from '../Store/Auth/auth.actions';

export const getAllPosts = () => {
  return axios
    .get('/api/posts')
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return null;
    });
};

export const createPost = ({ token, subject, body, tags, thumbnail }) => {
  const data = new FormData();
  data.append('subject', subject);
  data.append('body', body);
  data.append('tags', tags || []);
  data.append('post_image', thumbnail);

  const headers = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };
  return axios
    .post('/api/posts', data, headers)
    .then((res) => {
      console.log('[BLOG API] Created post with success.');

      return { hasError: false, data: res.data.data, errorMessage: '' };
    })
    .catch((err) => {
      return {
        hasError: true,
        data: err.response.data,
        errorMessage: 'Could not create post.',
      };
    });
};

export const deletePost = ({ token, postId }) => {
  const headers = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return axios
    .delete('/api/posts/' + postId, headers)
    .then((res) => {
      console.log('[BLOG API] Post Removed with Success');

      return {
        hasError: false,
        errorMessage: '',
        data: res.data,
      };
    })
    .catch((res) => {
      return {
        hasError: true,
        errorMessage:
          res?.response?.data?.errorMessage || 'Could not delete the post',
        data: res.response.data,
      };
    });
};

export const editPost = (token, id, newPost) => {
  const data = new FormData();
  data.append('subject', newPost.subject);
  data.append('body', newPost.body);
  data.append('tags', newPost.tags || '');
  data.append('post_image', newPost.thumbnail);

  const headers = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };
  return axios
    .put(`/api/posts/${id}`, data, headers)
    .then((res) => {
      console.log('[BLOG API] Created post with success.');

      return { hasError: false, data: res.data.data, errorMessage: '' };
    })
    .catch((err) => {
      return {
        hasError: true,
        data: err.response.data,
        errorMessage:
          err.response.errorMessage?.[0] ||
          err.response.errorMessage ||
          'Could not update post.',
      };
    });
};

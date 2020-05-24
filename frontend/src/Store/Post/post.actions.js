import axios from 'axios';
import { PostActionTypes } from './post.types';
import { getAllPosts } from '../../api/blog';
import { removeLoader, addLoader } from '../Controls/controls.actions';

const setLoading = (bool) => ({
  type: PostActionTypes.LOADING,
  payload: bool,
});
export const fetchPosts = () => async (dispatch) => {
  dispatch(setLoading(true));

  dispatch(addLoader('GET_ALL_POSTS'));
  const data = await getAllPosts();
  dispatch(removeLoader('GET_ALL_POSTS'));

  if (data) {
    dispatch({
      type: PostActionTypes.FETCH_POSTS,
      payload: data,
    });
  } else {
    throw new Error('Couldnt reach the posts');
  }
};

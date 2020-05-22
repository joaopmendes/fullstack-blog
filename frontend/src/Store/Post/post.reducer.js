import { initialState } from './post.initialState';
import { PostActionTypes } from './post.types';

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case PostActionTypes.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

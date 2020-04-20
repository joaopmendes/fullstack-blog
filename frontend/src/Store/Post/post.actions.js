import axios from 'axios';
import {PostActionTypes} from './post.types';
import {getAllPosts} from "../../api/blog";

const setLoading = (bool) => ({
    type: PostActionTypes.LOADING,
    payload: bool,
});
export const fetchPosts = () => async (dispatch) => {
    dispatch(setLoading(true));
    const data = await getAllPosts();
    console.log("data:", data);
    console.log("I can reach here");
    if(data) {
        dispatch({
            type: PostActionTypes.FETCH_POSTS,
            payload: data,
        });
    } else {
        throw new Error('Couldnt reach the posts')
    }
    dispatch(setLoading(false));
};

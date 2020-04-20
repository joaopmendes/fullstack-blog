import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../Store/Post/post.actions';
import { getRandomsFromArray } from '../../Helpers/helpers';
import { BlogLayoutComponent } from '../../Components/BlogLayout/blog-layout.component';

import CardWrapperComponent from '../../Components/CardWrapper/card-wrapper.component';
import CardWrapperHeaderComponent from '../../Components/CardWrapperHeader/card-wrapper-header.component';
import BlogPageBodyComponent from '../../Components/BlogPageBody/blog-page-body.component';
import {updateUserData} from "../../Store/Auth/auth.actions";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.post);
  console.log(getRandomsFromArray(['teste', 'teste1', 'teste2'], 3));

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(updateUserData());
    const getPostsInterval = setInterval(() => {
      dispatch(fetchPosts());
    }, 30000);

    return () => {
      clearInterval(getPostsInterval);
    };
  }, [dispatch]);
  return (
    <BlogLayoutComponent>
      <CardWrapperComponent>
        <CardWrapperHeaderComponent title={'List of Posts'}/>
        <BlogPageBodyComponent />
      </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};

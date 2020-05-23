import React from 'react';
import { BlogLayoutComponent } from '../../../Components/BlogLayout/blog-layout.component';
import CardWrapperComponent from '../../../Components/CardWrapper/card-wrapper.component';
import CardWrapperHeaderComponent from '../../../Components/CardWrapperHeader/card-wrapper-header.component';
import { useSelector } from 'react-redux';
import ManagePostList from '../../../Components/ManagePostsLists/manage-post-list.component';
const ManagePostPage = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <BlogLayoutComponent>
      <CardWrapperComponent>
        <CardWrapperHeaderComponent title={'Manage Posts'} />
        <ManagePostList user={user} />
      </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};
export default ManagePostPage;

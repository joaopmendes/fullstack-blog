import React from 'react';
import { MDBBtn, MDBCol, MDBDataTable, MDBRow } from 'mdbreact';
import PropTypes from 'prop-types';
import { deletePost } from '../../api/blog';
import { updateUserData } from '../../Store/Auth/auth.actions';
import { fetchPosts } from '../../Store/Post/post.actions';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import { addLoader, removeLoader } from '../../Store/Controls/controls.actions';
const ManagePostList = ({ user }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();
  const data = {
    columns: [
      {
        label: 'Post Title',
        field: 'postTitle',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Created At',
        field: 'created_at',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Options',
        field: 'options',
        sort: 'asc',
        width: 500,
      },
    ],
    rows: user.posts.map((post) => ({
      postTitle: post.subject,
      created_at: new Date(post.created_at).toDateString(),
      options: [
        <MDBBtn
          onClick={async () => {
            dispatch(addLoader('DELETE_POST'));
            const { errorMessage, hasError } = await deletePost({
              token: user.accessToken,
              postId: post._id,
            });
            dispatch(removeLoader('DELETE_POST'));

            if (hasError) {
              addToast(errorMessage, { appearance: 'error' });
              return;
            }
            addToast('Post deleted successfully.', { appearance: 'success' });

            dispatch(updateUserData());
            dispatch(fetchPosts());
          }}
          color={'danger'}
        >
          Delete
        </MDBBtn>,
        <MDBBtn
          onClick={async () => {
            history.push('/posts/edit/' + post._id);
          }}
          color={'warning'}
        >
          Edit
        </MDBBtn>,
      ],
    })),
  };
  return (
    <MDBRow>
      <MDBCol>
        <MDBDataTable striped bordered hover data={data} />
      </MDBCol>
    </MDBRow>
  );
};
ManagePostList.propTypes = {
  user: PropTypes.object.isRequired,
};
export default ManagePostList;

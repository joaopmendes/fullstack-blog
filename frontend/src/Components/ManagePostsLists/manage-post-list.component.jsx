import React from 'react';
import {MDBBtn, MDBCol, MDBDataTable, MDBRow,} from "mdbreact";
import PropTypes from "prop-types"
import {deletePost} from "../../api/blog";
import {updateUserData} from "../../Store/Auth/auth.actions";
import {fetchPosts} from "../../Store/Post/post.actions";
import {useDispatch} from "react-redux";
const ManagePostList = ({user}) => {
    const dispatch = useDispatch();
    const data = {
            columns: [
                {
                    label: 'Post Title',
                    field: 'postTitle',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Created At',
                    field: 'created_at',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Options',
                    field: 'options',
                    sort: 'asc',
                    width: 500
                },
            ],
        rows: user.posts.map(post => ({
            postTitle: post.subject,
            created_at: new Date(post.created_at).toDateString(),
            options: [
                <MDBBtn onClick={() => {
                    deletePost({token: user.accessToken, postId: post._id});
                    dispatch(updateUserData());
                    dispatch(fetchPosts());
                }} type={"danger"}>Delete</MDBBtn>
            ]
        }))
    };
    return (
        <MDBRow>

            <MDBCol>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                />
            </MDBCol>
        </MDBRow>

    );
};
ManagePostList.propTypes = {
    user: PropTypes.object.isRequired
}
export default ManagePostList;

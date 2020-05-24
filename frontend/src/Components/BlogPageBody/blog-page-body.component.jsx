import React from 'react';
import { useSelector } from 'react-redux';
import { MDBRow, MDBCol, MDBMask, MDBIcon, MDBView, MDBBtn } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import { getDaysSince } from '../../helpers/helpers';
const BlogPageBodyComponent = () => {
  const { posts } = useSelector((state) => state.post);
  const history = useHistory();

  return (
    <>
      {posts.map((post) => (
        <>
          <MDBRow>
            <MDBCol lg="5">
              <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                <img
                  className="img-fluid"
                  src={
                    post.postImage
                      ? `${
                          process.env.NODE_ENV === 'development'
                            ? `http://localhost:4000/`
                            : '/'
                        }${post.postImage.replace(/\\/g, '/')}`
                      : 'https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg'
                  }
                  alt=""
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
            </MDBCol>
            <MDBCol lg="7">
              {post.tags.map((tag, index) => {
                return (
                  <a href="#!" className="green-text">
                    <h6 className="font-weight-bold mb-3 d-inline">
                      {tag.name.replace(/"/g, '')}
                      {index + 1 !== post.tags.length && ', '}
                    </h6>
                  </a>
                );
              })}
              <h2 className="font-weight-bold mb-3 p-0">
                <strong>{post.subject}</strong>
              </h2>
              <p>
                by
                <a href="#!">
                  <strong> {post.author.name}</strong>
                </a>
                , {`${getDaysSince(post.created_at)}`} days
              </p>
              <MDBBtn
                color="success"
                size="md"
                className="waves-light"
                onClick={() => {
                  history.push('/posts/show/' + post._id);
                }}
              >
                Read more
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <hr className="my-5" />
        </>
      ))}
    </>
  );
};

export default BlogPageBodyComponent;

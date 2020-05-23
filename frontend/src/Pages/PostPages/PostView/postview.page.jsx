import React from 'react';
import { useSelector } from 'react-redux';
import { BlogLayoutComponent } from '../../../Components/BlogLayout/blog-layout.component';
import CardWrapperComponent from '../../../Components/CardWrapper/card-wrapper.component';
import CardWrapperHeaderComponent from '../../../Components/CardWrapperHeader/card-wrapper-header.component';
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBMask,
  MDBIcon,
  MDBView,
  MDBBtn,
} from 'mdbreact';
import { getDaysSince } from '../../../helpers/helpers';
import styled from 'styled-components';

export const PostViewPage = ({
  match: {
    params: { id },
  },
}) => {
  const posts = useSelector((state) => state.post.posts);
  const post = posts.find((post) => post._id === id);

  return (
    <BlogLayoutComponent>
      <CardWrapperComponent>
        <CardWrapperHeaderComponent title={''} />
        <MDBContainer>
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
                            : ''
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
              <Flex>
                <p>
                  {post.tags.map((tag, index) => {
                    return (
                      <a href="#!" className="green-text d-inline">
                        <h6 className="font-weight-bold mb-3 d-inline">
                          {tag.name.replace(/"/g, '')}
                          {index + 1 !== post.tags.length && ', '}
                        </h6>
                      </a>
                    );
                  })}
                </p>
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
              </Flex>
            </MDBCol>
          </MDBRow>
          <hr className="my-5" />
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
        </MDBContainer>
      </CardWrapperComponent>
    </BlogLayoutComponent>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

import React from 'react';
import {useSelector} from 'react-redux';
import {MDBRow, MDBCol, MDBMask, MDBIcon, MDBView, MDBBtn} from 'mdbreact';

const BlogPageBodyComponent = () => {
    const {posts} = useSelector((state) => state.post);
    const getDaysSince = (date) => {
        // The number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24;

        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(new Date() - new Date(date));

        // Convert back to days and return
        return Math.round(differenceMs / ONE_DAY);
    };
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
                                        post.postImage ||
                                        'https://mdbootstrap.com/img/Photos/Others/img%20(27).jpg'
                                    }
                                    alt=""
                                />
                                <a href="#!">
                                    <MDBMask overlay="white-slight"/>
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
                            <h3 className="font-weight-bold mb-3 p-0">
                                <strong>{post.title}</strong>
                            </h3>
                            <div
                                style={{
                                    overflow: 'hidden',
                                    height: '100px',
                                }}
                                dangerouslySetInnerHTML={{__html: post.body}}
                            />
                            ...
                            <p>
                                by
                                <a href="#!">
                                    <strong> {post.author.name}</strong>
                                </a>
                                , {`${getDaysSince(post.created_at)}`} days
                            </p>
                            <MDBBtn color="success" size="md" className="waves-light ">
                                Read more
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <hr className="my-5"/>
                </>
            ))}
        </>
    );
};

export default BlogPageBodyComponent;

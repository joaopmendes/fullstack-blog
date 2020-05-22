import React, {useState} from 'react';
import {BlogLayoutComponent} from "../../Components/BlogLayout/blog-layout.component";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import axios from "axios";
import CardWrapperComponent from "../../Components/CardWrapper/card-wrapper.component";
import CardWrapperHeaderComponent from "../../Components/CardWrapperHeader/card-wrapper-header.component";
import {FormWrapper} from "../../Components/MacroControllers/form-wrapper.component";
import {initialValues, validationSchema} from "./create-post.config";
import CreatePostFormComponent from "../../Components/CreatePostForm/create-post-form.component";
import {createPost} from "../../api/blog";
import {updateUserData} from "../../Store/Auth/auth.actions";
import {fetchPosts} from "../../Store/Post/post.actions";
const CreatePostPage = ({}) => {
    const [serverError, setServerError] = useState('');
    const dispatch = useDispatch();
    const {user} = useSelector(store => store.auth);
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            setSubmitting(false);
            const data = createPost({token: user.accessToken, subject: values.subject, body: values.body, tags: values.tags, thumbnail: values.thumbnail})

            if(data) {
                alert('Post created successfuly');
                dispatch(updateUserData());
                dispatch(fetchPosts());
            } else {
                setServerError('Could not create the post')
            }
        },
    });
    return (
        <BlogLayoutComponent>
            <CardWrapperComponent>
                <CardWrapperHeaderComponent title="Create a Post"/>
                <FormWrapper>
                    <CreatePostFormComponent { ...formik  } serverError={serverError}/>
                </FormWrapper>
            </CardWrapperComponent>
        </BlogLayoutComponent>
    );
}
export default CreatePostPage

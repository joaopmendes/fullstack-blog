import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {FormWrapper} from '../../Components/MacroControllers/form-wrapper.component';
import {PageHeading} from '../../Components/MacroControllers/page-heading.component';
import {initialValues, validationSchema} from './register.config';
import {login} from '../../Store/Auth/auth.actions';
import RegisterForm from '../../Components/RegisterForm/register-form.component';
import {BlogLayoutComponent} from "../../Components/BlogLayout/blog-layout.component";
import CardWrapperComponent from "../../Components/CardWrapper/card-wrapper.component";
import CardWrapperHeaderComponent from "../../Components/CardWrapperHeader/card-wrapper-header.component";
import LoginFormComponent from "../../Components/LoginForm/login-form.component";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const [serverError, setServerError] = useState('');
    const onSubmit = (values, {setSubmitting}) => {
        setSubmitting(true);
        const data = new FormData();
        data.append('name', values.name);
        data.append('email', values.email);
        data.append('password', values.password);
        data.append('profile_image', values.avatar);

        const headers = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios
            .post('/api/register', data, headers)
            .then((res) => {
                setSubmitting(false);

                if (res.data.code === 200) {
                    const payload = {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        accessToken: res.data.user.accessToken,
                        posts: res.data.user.posts,
                        profilePicture: res.data.user.profilePicture,
                        // eslint-disable-next-line
                        id: res.data.user._id,
                    };
                    setServerError();
                    dispatch(login(payload));
                } else {
                    setServerError(res.data.errorMessage);
                }
            })
            .catch(() => {
                setServerError('Something went wrong');
                setSubmitting(false);
            });
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });
    return (
        <BlogLayoutComponent>
            <CardWrapperComponent>
                <CardWrapperHeaderComponent title="Register"/>
                <FormWrapper>
                    <RegisterForm { ...formik  } serverError={serverError} />
                </FormWrapper>
            </CardWrapperComponent>
        </BlogLayoutComponent>
    );
};

export default RegisterPage;

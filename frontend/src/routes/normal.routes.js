import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {HomePage} from '../Pages/home/home.page';
import RegisterPage from '../Pages/register/register.page';
import LoginPage from '../Pages/login/login.page';
import CreatePostPage from "../Pages/create-post/create-post.page";
import ManagePostPage from "../Pages/manage-posts/manage-posts.page";

const OnlyNotLoginRoute = ({Component, ...rest}) => {
    const auth = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={(props) =>
                !auth.userLoggedIn ? <Component {...props} /> : <Redirect to="/"/>
            }
        />
    );
};
const OnlyLoginRoute = ({Component, ...rest}) => {
    const auth = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                auth.userLoggedIn ? <Component {...props} /> : <Redirect to="/"/>
            }
        />
    );
};
const NormalRoutes = () => (
    <>
        <Route path="/" exact component={HomePage}/>
        <OnlyNotLoginRoute path="/register" Component={RegisterPage}/>
        <OnlyLoginRoute path="/manage" Component={RegisterPage}/>
        <OnlyLoginRoute path="/create-post" Component={CreatePostPage}/>
        <OnlyLoginRoute path="/manage-posts" Component={ManagePostPage}/>
        <OnlyNotLoginRoute path="/login" Component={LoginPage}/>
    </>
);
export default NormalRoutes;

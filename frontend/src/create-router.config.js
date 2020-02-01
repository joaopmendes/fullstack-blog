import React from "react";
import styled from "styled-components"
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {HomePage} from "./Pages/home/home.page";
import {RegisterPage} from "./Pages/register/register.page";
import {LoginPage} from "./Pages/login/login.page";
import {Navbar} from "./Components/navbar/navbar.component";
import {Container} from "./globa.styles";

const Routes = () => (
    <>
        <Route path={"/"} exact component={HomePage} />
        <Route path={"/register"} exact component={RegisterPage} />
        <Route path={"/login"} exact component={LoginPage} />
    </>
);
export const RouterConfig = () => <>
    <BrowserRouter>
            <Navbar />
            <Container>
            <Switch>
                <Routes/>
            </Switch>
            </Container>
    </BrowserRouter>
</>;
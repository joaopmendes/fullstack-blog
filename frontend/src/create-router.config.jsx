import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomePage } from './Pages/home/home.page';
import RegisterPage from './Pages/register/register.page';
import LoginPage from './Pages/login/login.page';
import { Navbar } from './Components/navbar/navbar.component';
import { Container } from './global.styles';

const OnlyLoginRoute = ({ ...rest }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.userLoggedIn) {
    return <Route {...rest} />;
  }
  return <Redirect to="/login" />;
};
const OnlyNotLoginRoute = ({ ...rest }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.userLoggedIn) {
    return <Route {...rest} />;
  }
  return <Redirect to="/" />;
};

const Routes = () => (
  <>
    <Route path="/" exact component={HomePage} />
    <OnlyNotLoginRoute path="/register" exact component={RegisterPage} />
    <OnlyLoginRoute path="/profile" exact component={RegisterPage} />
    <OnlyLoginRoute path="/manage" exact component={RegisterPage} />
    <OnlyNotLoginRoute path="/login" exact component={LoginPage} />
  </>
);
export const RouterConfig = () => (
  <>
    <BrowserRouter>
      <Navbar />
      <Container>
        <Switch>
          <Routes />
        </Switch>
      </Container>
    </BrowserRouter>
  </>
);

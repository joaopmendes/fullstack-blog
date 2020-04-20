import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NormalRoutes from './routes/normal.routes';
import AdminRoutes from './routes/admin.routes';

const Routes = () => (
  <>
    <NormalRoutes />
    <AdminRoutes />
  </>
);
export const RouterConfig = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Routes />
      </Switch>
    </BrowserRouter>
  </>
);

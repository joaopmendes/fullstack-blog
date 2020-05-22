import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Notifications from './Components/Notifications/notifications';
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
      <Notifications />
      <Switch>
        <Routes />
      </Switch>
    </BrowserRouter>
  </>
);

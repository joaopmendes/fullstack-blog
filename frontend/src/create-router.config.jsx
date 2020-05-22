import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NormalRoutes from './routes/normal.routes';
import AdminRoutes from './routes/admin.routes';
import { useSelector, useDispatch } from 'react-redux';
import { MDBNotification } from 'mdbreact';
import { removeNotification } from './Store/Notifications/notifications.actions';
import Cliclable from './Components/MacroControllers/Clicable';
const Routes = () => (
  <>
    <NormalRoutes />
    <AdminRoutes />
  </>
);
export const RouterConfig = () => {
  const notifications = useSelector((store) => store.notifications);
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
        {notifications.map((notification) => (
          <Cliclable
            onClick={() => {
              dispatch(removeNotification(notification.id));
            }}
          >
            <MDBNotification
              show
              fade
              iconClassName={`text-${notification.type}`}
              title={`${notification.title}`}
              message={`${notification.message}`}
              style={{
                position: 'fixed',
                top: '100px',
                right: '350px',
                width: '200px',
                zIndex: 9999,
              }}
            />
          </Cliclable>
        ))}
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </>
  );
};

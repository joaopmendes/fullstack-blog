import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NormalRoutes from './routes/normal.routes';
import AdminRoutes from './routes/admin.routes';
import {useSelector} from "react-redux";
import {MDBNotification} from "mdbreact";

const Routes = () => (
  <>
    <NormalRoutes />
    <AdminRoutes />
  </>
);
export const RouterConfig = () => {
    const notifications = useSelector(store => store.notifications);

    return (
        <>
            <BrowserRouter>
                {
                    notifications.map(notification => (
                        <MDBNotification
                            show
                            fade
                            iconClassName={`text-${notification.type}`}
                            title={`${notification.title}`}
                            message={`${notification.message}`}
                            style={{
                                position: "fixed",
                                top: "100px",
                                right: "350px",
                                zIndex: 9999
                            }}
                        />
                    ))
                }
                <Switch>

                    <Routes/>
                </Switch>
            </BrowserRouter>
        </>
    );
};

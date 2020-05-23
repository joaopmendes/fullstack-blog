import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardPage from '../Admin/pages/DashboardPage';
const AdminRoute = ({ Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.userLoggedIn && auth.user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
const AdminRoutes = () => {
  return (
    <>
      <AdminRoute path="/admin/dashboard" Component={DashboardPage} />
    </>
  );
};

export default AdminRoutes;

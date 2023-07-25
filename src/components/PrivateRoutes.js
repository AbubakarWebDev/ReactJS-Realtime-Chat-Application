import React from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

function PrivateRoutes({ protect }) {
  const { isUserLoggedIn } = useLoaderData();

  if (protect) {
    return isUserLoggedIn ? <Outlet /> : <Navigate to='/login' />
  }

  return isUserLoggedIn ? <Navigate to='/' /> : <Outlet />;
}

export default React.memo(PrivateRoutes);
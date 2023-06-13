import React from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

function PrivateRoutes({ protect }) {
  const isUserLoggedIn = useLoaderData();

  if (protect) {
    return isUserLoggedIn ? <Navigate to='/' /> : <Outlet />
  }

  return isUserLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default React.memo(PrivateRoutes);
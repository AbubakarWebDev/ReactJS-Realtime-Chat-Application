import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  let auth = { 'token': true };

  return (
    auth.token ? <Outlet /> : <Navigate to='/login' />
  );
}

export default PrivateRoutes;
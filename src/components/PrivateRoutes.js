import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

import Loader from "./Loader";

function PrivateRoutes({ protect }) {
  const { loading, error, user } = useSelector((state) => state.user);

  if (protect) {
    return loading ? <Loader />  : (
      (!error && user) ? <Navigate to='/' /> : <Outlet />
    );
  }

  return loading ? <Loader />  : (
    (!error && user) ? <Outlet /> : <Navigate to='/login' />
  );
}

export default PrivateRoutes;
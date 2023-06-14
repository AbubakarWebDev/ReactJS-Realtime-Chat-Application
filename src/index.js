import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'

import router from './routes';
import { store } from './store'
import Loader from './components/Loader';

import "./styles/globals.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider
        router={router}
        fallbackElement={<Loader />}
      />
    </Provider>
  </React.StrictMode>
);
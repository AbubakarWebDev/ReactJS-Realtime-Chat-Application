import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';
import App from './App';

import "./styles/globals.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
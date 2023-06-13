import { configureStore } from '@reduxjs/toolkit';

import { homePageReducer } from './slices/homePageSlice';
import { authReducer, authActions } from './slices/authSlice';
import { userReducer, getLoggedInUser } from './slices/userSlice';
import { Location } from 'react-router-dom';

const store = configureStore({
    reducer: {
        homePage: homePageReducer,
        auth: authReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});

export { store };
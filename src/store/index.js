import { configureStore } from '@reduxjs/toolkit';

import { homePageReducer } from './slices/homePageSlice';
import { authReducer } from './slices/authSlice';
import { userReducer, getLoggedInUser } from './slices/userSlice';

const store = configureStore({
    reducer: {
        homePage: homePageReducer,
        auth: authReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});

const token = localStorage.getItem('token');

store.dispatch(getLoggedInUser(token));

export { store };
import { configureStore } from '@reduxjs/toolkit';

import { homePageReducer } from './slices/homePageSlice';
import { authReducer } from './slices/authSlice';

const store = configureStore({
    reducer: {
        homePage: homePageReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});

export { store };
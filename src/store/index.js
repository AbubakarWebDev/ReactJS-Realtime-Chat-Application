import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { userReducer } from './slices/userSlice';
import { chatReducer } from './slices/chatSlice';
import { homePageReducer } from './slices/homePageSlice';

const store = configureStore({
    reducer: {
        homePage: homePageReducer,
        auth: authReducer,
        user: userReducer,
        chat: chatReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});

export { store };
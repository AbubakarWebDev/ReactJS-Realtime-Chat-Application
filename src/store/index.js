import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/authSlice';
import { userReducer } from './slices/userSlice';
import { chatReducer } from './slices/chatSlice';
import { messageReducer } from './slices/messageSlice';
import { homePageReducer } from './slices/homePageSlice';

const store = configureStore({
    reducer: {
        homePage: homePageReducer,
        auth: authReducer,
        user: userReducer,
        chat: chatReducer,
        message: messageReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: import.meta.env.DEV,
});

export { store };
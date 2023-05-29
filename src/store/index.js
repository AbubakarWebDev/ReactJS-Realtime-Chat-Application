import { configureStore } from '@reduxjs/toolkit';

import { homePageReducer } from './slices/homePageSlice';

const store = configureStore({
    reducer: {
        homePage: homePageReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});

export { store };
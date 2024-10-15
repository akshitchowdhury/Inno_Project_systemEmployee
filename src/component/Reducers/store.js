// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';  // Ensure correct relative path

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;

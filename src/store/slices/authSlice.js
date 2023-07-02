import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleAPIError } from '../../services/api.service';
import {
    register as registerUser,
    login as loginUser,
    forgotPassword as forgot,
    resetPassword as reset,
} from "../../services/auth.service";

const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await registerUser(userData, thunkAPI.signal);
        return response.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await loginUser(userData, thunkAPI.signal);
        return response.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const forgotPassword = createAsyncThunk('auth/forgotPassword', async (userData, thunkAPI) => {
    try {
        const response = await forgot(userData, thunkAPI.signal);
        return response.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const resetPassword = createAsyncThunk('auth/resetPassword', async (userData, thunkAPI) => {
    try {
        const response = await reset(userData, thunkAPI.signal);
        return response.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const initialState = {
    error: null,
    token: null,
    loading: false,
    isEmailSent: null,
    isRegistered: null,
    isPasswordReset: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: function (state) {
            state.token = null;
            localStorage.removeItem("token");
        },
        setError: function (state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // reducer for register action
            .addCase(register.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.isRegistered = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.isRegistered = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.isRegistered = null;
                state.error = action.payload;
            })

            // reducer for Login action
            .addCase(login.pending, (state) => {
                state.error = null;
                state.token = null;
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.token = action.payload.result.token

                localStorage.setItem('token', action.payload.result.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.token = null;
                state.loading = false;
                state.error = action.payload;
            })

            // reducer for forgotPassword action
            .addCase(forgotPassword.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.isEmailSent = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
                state.isEmailSent = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.isEmailSent = null;
                state.error = action.payload;
            })

            // reducer for resetPassword action
            .addCase(resetPassword.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.isPasswordReset = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.error = null;
                state.loading = false;
                state.isPasswordReset = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.isPasswordReset = null;
                state.error = action.payload;
            });
    },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, register, login, forgotPassword, resetPassword, authActions };
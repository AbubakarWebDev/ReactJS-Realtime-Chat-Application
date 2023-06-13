import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleAPIError } from '../../services/api.service';
import {
    register as registerUser,
    login as loginUser
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
        console.log(err);
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const initialState = {
    signupMessage: null,
    token: null,
    loading: false,
    signupError: null,
    loginError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: function (state) {
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            // Register Reducers
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.signupError = null;
                state.signupMessage = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.signupMessage = action.payload;
                state.signupError = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.signupError = action.payload;
                state.signupMessage = null;
            })

            // Login Reducers
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.loginError = null;
                state.token = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.loginError = null;
                state.token = action.payload.result.token

                localStorage.setItem('token', action.payload.result.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload;
                state.token = null;
            });
    },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, register, login, authActions };
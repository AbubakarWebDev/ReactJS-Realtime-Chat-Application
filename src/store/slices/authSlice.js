import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleAPIError } from '../../services/api.service';
import { register as registerUser } from "../../services/auth.service";

const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await registerUser(userData, thunkAPI.signal);
        return response.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const initialState = {
    signupMessage: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.signupMessage = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                console.log(action);
                state.error = action.payload;
            });
    },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, register, authActions };
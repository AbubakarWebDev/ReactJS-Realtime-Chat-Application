import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleAPIError } from '../../services/api.service';
import { currentUser } from "../../services/user.service";
import { authActions } from "./authSlice";

const getLoggedInUser = createAsyncThunk('user/getLoggedInUser', async (token, thunkAPI) => {
    try {
        const response = await currentUser(token, thunkAPI.signal);
        return response.data.result.user;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getLoggedInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.user = null;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })

            .addCase(authActions.logout, (state, action) => {
                state.user = null;
            });
    },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducer, getLoggedInUser, userActions };
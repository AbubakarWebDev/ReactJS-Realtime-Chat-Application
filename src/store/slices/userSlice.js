import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { authActions } from "./authSlice";
import { handleAPIError } from '../../services/api.service';
import {
    currentUser, 
    userExist, 
    getAllUsers as getUsers, 
    updateUserAvatar as updateAvatar,
    updateUserProfile as updateProfile,
} from "../../services/user.service";

const getLoggedInUser = createAsyncThunk('user/getLoggedInUser', async (arg, thunkAPI) => {
    try {
        const response = await currentUser(thunkAPI.signal);
        return response.data.result.user;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const checkUserExist = createAsyncThunk('user/checkUserExist', async (id, thunkAPI) => {
    try {
        const response = await userExist(id, thunkAPI.signal);
        return response.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const getAllUsers = createAsyncThunk('user/getAllUsers', async (search, thunkAPI) => {
    try {
        const response = await getUsers(search, thunkAPI.signal);
        return response.data.result.users;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(userSlice.actions.setError(null));

        const response = await updateProfile(payload, thunkAPI.signal);
        return response.data.result.user;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const updateUserAvatar = createAsyncThunk('user/updateUserAvatar', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(userSlice.actions.setError(null));

        const response = await updateAvatar(payload, thunkAPI.signal);
        return response.data.result.user;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const initialState = {
    user: null,
    users: null,
    error: null,
    loading: false,
    isUserExist: null,
    avatarUpdateError: null,
    profileUpdateError: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError: function (state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // reducers for getLoggedInUser action
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

            // reducers for checkUserExist action
            .addCase(checkUserExist.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.isUserExist = null;
            })
            .addCase(checkUserExist.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.isUserExist = true;
            })
            .addCase(checkUserExist.rejected, (state, action) => {
                state.loading = false;
                state.isUserExist = null;
                state.error = action.payload;
            })

            // reducers for getAllUsers action
            .addCase(getAllUsers.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.users = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.users = null;
                state.error = action.payload;
            })

            // reducers for updateUserProfile action
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.profileUpdateError = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.profileUpdateError = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.profileUpdateError = action.payload;
            })

            // reducers for updateUserAvatar action
            .addCase(updateUserAvatar.pending, (state) => {
                state.avatarUpdateError = null;
                state.loading = true;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.avatarUpdateError = null;
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.avatarUpdateError = action.payload;
            })

            // reducer for logout action
            .addCase(authActions.logout, (state, action) => {
                state.user = null;
            });
    },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducer, getLoggedInUser, checkUserExist, userActions, getAllUsers, updateUserAvatar, updateUserProfile };
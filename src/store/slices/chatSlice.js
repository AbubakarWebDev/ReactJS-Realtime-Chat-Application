import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleAPIError } from '../../services/api.service';
import { getAllChats as chats, getorCreateChats as createChat } from "../../services/chat.service";

const getAllChats = createAsyncThunk('chat/getAllChats', async (arg, thunkAPI) => {
    try {
        const response = await chats(thunkAPI.signal);
        return response.data.result.chats;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const getorCreateChats = createAsyncThunk('chat/getorCreateChats', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(chatSlice.actions.setError(null));

        const response = await createChat(payload, thunkAPI.signal);
        return response.data.result.chat;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const initialState = {
    error: null,
    loading: false,
    chats: null,
    activeChat: null,
};

var chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setError: function (state, action) {
            state.error = action.payload;
        },
        setActiveChat: function (state, action) {
            state.activeChat = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register Reducers for getAllChats action
            .addCase(getAllChats.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.chats = null;
            })
            .addCase(getAllChats.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(getAllChats.rejected, (state, action) => {
                state.loading = false;
                state.chats = null;
                state.error = action.payload;
            })

            // Register Reducers for getorCreateChats action
            .addCase(getorCreateChats.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.activeChat = null;
            })
            .addCase(getorCreateChats.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;
            })
            .addCase(getorCreateChats.rejected, (state, action) => {
                state.loading = false;
                state.activeChat = null;
                state.error = action.payload;
            })
    },
});

const chatReducer = chatSlice.reducer;
const chatActions = chatSlice.actions;

export { getAllChats, chatReducer, chatActions, getorCreateChats };
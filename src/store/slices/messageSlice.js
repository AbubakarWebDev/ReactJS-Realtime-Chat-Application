import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleAPIError } from '../../services/api.service';
import {
    getAllMessages as getMessages,
    sendMessage as sendMsg,
    updateReadBy as readBy
} from "../../services/message.service";

const getAllMessages = createAsyncThunk('message/getAllMessages', async (payload, thunkAPI) => {
    try {
        const response = await getMessages(payload, thunkAPI.signal);
        return response.data.result.messages;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const sendMessage = createAsyncThunk('message/sendMessage', async (payload, thunkAPI) => {
    try {
        const response = await sendMsg(payload, thunkAPI.signal);
        return response.data.result.message;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const updateReadBy = createAsyncThunk('message/updateReadBy', async (payload, thunkAPI) => {
    try {
        const response = await readBy(payload, thunkAPI.signal);
        return response.data.result.message;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const initialState = {
    error: null,
    messages: null,
    loading: false,
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setError: function (state, action) {
            state.error = action.payload;
        },
        pushMessage: function (state, action) {
            if (state.messages != null) {
                state.messages.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // reducers for "getAllMessages" action
            .addCase(getAllMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.messages = null;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.messages = action.payload;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.messages = null;
            })

            // reducers for "sendMessage" action
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // reducers for "updateReadBy" action
            .addCase(updateReadBy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReadBy.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const message = state.messages.find(msg => msg._id === action.payload._id);
                message.readBy = action.payload.readBy;
            })
            .addCase(updateReadBy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

const messageReducer = messageSlice.reducer;
const messageActions = messageSlice.actions;

export { messageReducer, messageActions, getAllMessages, sendMessage, updateReadBy };
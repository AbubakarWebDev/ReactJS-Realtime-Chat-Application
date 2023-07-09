import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleAPIError } from '../../services/api.service';
import {
    getAllChats as chats,
    getorCreateChats as createChat,
    createGroupChat as groupChat,
    updateGroupUsers as groupUsers,
    updateGroupAdmins as groupAdmins,
    renameGroupName as renameGroup,
    removeUserFromGroup as removeGroupUser
} from "../../services/chat.service";

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

const createGroupChat = createAsyncThunk('chat/createGroupChat', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(chatSlice.actions.setError(null));

        const response = await groupChat(payload, thunkAPI.signal);
        return response.data.result.chat;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const updateGroupUsers = createAsyncThunk('chat/updateGroupUsers', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(chatSlice.actions.setError(null));

        const response = await groupUsers(payload, thunkAPI.signal);
        return response.data.result.chat;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const updateGroupAdmins = createAsyncThunk('chat/updateGroupAdmins', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(chatSlice.actions.setError(null));

        const response = await groupAdmins(payload, thunkAPI.signal);
        return response.data.result.chat;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const renameGroupName = createAsyncThunk('chat/renameGroupName', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(chatSlice.actions.setError(null));

        const response = await renameGroup(payload, thunkAPI.signal);
        return response.data.result.chat;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(handleAPIError(err));
    }
});

const removeUserFromGroup = createAsyncThunk('chat/removeUserFromGroup', async (payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(chatSlice.actions.setError(null));

        const response = await removeGroupUser(payload, thunkAPI.signal);
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
    createdChat: null,
    createdGroupChat: null,
    updateGroupUsers: null,
    updateGroupAdmins: null,
    renameGroupName: null,
    removeGroupUser: null,
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
            // Register Reducers for "getAllChats" action
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

            // Register Reducers for "getorCreateChats" action
            .addCase(getorCreateChats.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.activeChat = null;
                state.createdChat = null;
            })
            .addCase(getorCreateChats.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;
                state.createdChat = action.payload;
            })
            .addCase(getorCreateChats.rejected, (state, action) => {
                state.loading = false;
                state.activeChat = null;
                state.createdChat = null;
                state.error = action.payload;
            })

            // Register Reducers for "createGroupChatٖ" action
            .addCase(createGroupChat.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.activeChat = null;
                state.createdGroupChat = null;
            })
            .addCase(createGroupChat.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;
                state.createdGroupChat = action.payload;
            })
            .addCase(createGroupChat.rejected, (state, action) => {
                state.loading = false;
                state.activeChat = null;
                state.createdGroupChat = null;
                state.error = action.payload;
            })

            // Register Reducers for "updateGroupUsers" action
            .addCase(updateGroupUsers.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.updateGroupUsers = null;
            })
            .addCase(updateGroupUsers.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.updateGroupUsers = action.payload;
            })
            .addCase(updateGroupUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.updateGroupUsers = null;
            })

            // Register Reducers for "updateGroupAdmins" action
            .addCase(updateGroupAdmins.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.activeChat = null;
                state.updateGroupAdmins = null;
            })
            .addCase(updateGroupAdmins.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;
                state.updateGroupAdmins = action.payload;
            })
            .addCase(updateGroupAdmins.rejected, (state, action) => {
                state.loading = false;
                state.activeChat = null;
                state.error = action.payload;
                state.updateGroupAdmins = null;
            })

            // Register Reducers for "renameGroupName" action
            .addCase(renameGroupName.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.activeChat = null;
                state.renameGroupName = null;
            })
            .addCase(renameGroupName.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;
                state.renameGroupName = action.payload;
            })
            .addCase(renameGroupName.rejected, (state, action) => {
                state.loading = false;
                state.activeChat = null;
                state.renameGroupName = null;
                state.error = action.payload;
            })

            // Register Reducers for "removeGroupUser" action
            .addCase(removeUserFromGroup.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.removeGroupUser = null;
            })
            .addCase(removeUserFromGroup.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.removeGroupUser = action.payload;
            })
            .addCase(removeUserFromGroup.rejected, (state, action) => {
                state.loading = false;
                state.removeGroupUser = null;
                state.error = action.payload;
            })
    },
});

const chatReducer = chatSlice.reducer;
const chatActions = chatSlice.actions;

export {
    getAllChats,
    chatReducer,
    chatActions,
    renameGroupName,
    createGroupChat,
    updateGroupUsers,
    getorCreateChats,
    updateGroupAdmins,
    removeUserFromGroup
};
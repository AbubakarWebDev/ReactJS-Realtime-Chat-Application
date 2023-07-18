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

import { changeObjectPosition } from '../../utils';

import { sendMessage, messageActions, updateReadBy } from "./messageSlice";

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
    chats: null,
    loading: false,
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
        },
        
        pushNewChat: function (state, action) {
            const chatIndex = state.chats.findIndex(chat => chat._id === action.payload._id);
            if (chatIndex === -1) state.chats.unshift(action.payload);
        },
        
        updateChat: function (state, action) {
            const chatIndex = state.chats.findIndex(chat => chat._id === action.payload._id);
            if (chatIndex !== -1) state.chats[chatIndex] = action.payload;
        },

        deleteChat: function(state, action) {
            const chatIndex = state.chats.findIndex(chat => chat._id === action.payload);

            if (chatIndex !== -1) {
                state.chats.splice(chatIndex, 1);                
                
                if (state.activeChat && (state.activeChat._id === action.payload)) {
                    state.activeChat = null;
                }
            }
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
            })
            .addCase(getorCreateChats.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;

                const chat = state.chats.find(chat => chat._id === action.payload._id);
                if (!chat) state.chats.unshift(action.payload);
            })
            .addCase(getorCreateChats.rejected, (state, action) => {
                state.loading = false;
                state.activeChat = null;
                state.error = action.payload;
            })

            // Register Reducers for "createGroupChatٖ" action
            .addCase(createGroupChat.pending, (state) => {
                state.error = null;
                state.loading = true;
                state.activeChat = null;
            })
            .addCase(createGroupChat.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;

                state.chats.unshift(action.payload);
            })
            .addCase(createGroupChat.rejected, (state, action) => {
                state.loading = false;
                state.activeChat = null;
                state.error = action.payload;
            })

            // Register Reducers for "updateGroupUsers" action
            .addCase(updateGroupUsers.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateGroupUsers.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;
            })
            .addCase(updateGroupUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register Reducers for "updateGroupAdmins" action
            .addCase(updateGroupAdmins.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateGroupAdmins.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat = action.payload;
            })
            .addCase(updateGroupAdmins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register Reducers for "renameGroupName" action
            .addCase(renameGroupName.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(renameGroupName.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.activeChat.chatName = action.payload.chatName;

                const chat = state.chats.find(chat => chat._id === action.payload._id);
                chat.chatName = action.payload.chatName;
            })
            .addCase(renameGroupName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register Reducers for "removeGroupUser" action
            .addCase(removeUserFromGroup.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(removeUserFromGroup.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;

                const chatIndex = state.chats.findIndex(chat => chat._id === action.payload._id);
                state.chats.splice(chatIndex, 1);
            })
            .addCase(removeUserFromGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update the latest message of an active chat when we send a message
            .addCase(sendMessage.fulfilled, (state, action) => {
                const chatIndex = state.chats.findIndex(chat => chat._id === action.payload.chat._id);
                state.chats[chatIndex].latestMessage = action.payload;

                if (state.activeChat && (action.payload.chat._id === state.activeChat._id)) {
                    state.activeChat.latestMessage = action.payload;
                }
                
                if (chatIndex !== 0) {
                    state.chats.unshift(state.chats.splice(chatIndex, 1)[0]);
                }
            })

            // set latest message when some new message receieved using websockets
            .addCase(messageActions.pushMessage, (state, action) => {
                const chatIndex = state.chats.findIndex(chat => chat._id === action.payload.message.chat._id);
                state.chats[chatIndex].latestMessage = action.payload.message;
                state.chats[chatIndex].unReadCount = parseInt(state.chats[chatIndex].unReadCount ? state.chats[chatIndex].unReadCount : 0) + 1;

                if (state.activeChat && (action.payload.message.chat._id === state.activeChat._id)) {
                    state.activeChat.latestMessage = action.payload.message;
                    state.activeChat.unReadCount = parseInt(state.activeChat.unReadCount ? state.activeChat.unReadCount : 0) + 1;
                }

                if (chatIndex !== 0) {
                    state.chats.unshift(state.chats.splice(chatIndex, 1)[0]);
                }
            })

            .addCase(updateReadBy.fulfilled, (state, action) => {
                const chatIndex = state.chats.findIndex(chat => chat._id === action.payload.chat._id);
                state.chats[chatIndex].unReadCount = state.chats[chatIndex].unReadCount - 1;
                state.activeChat.unReadCount = state.activeChat.unReadCount - 1;
                
                if (chatIndex !== 0) {
                    state.chats.unshift(state.chats.splice(chatIndex, 1)[0]);
                }
            });
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
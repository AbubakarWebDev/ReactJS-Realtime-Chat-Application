import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSidebar: false,
    showChatRoom: false,
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setSearchUserSidebar: function(state, action) {
            state.showSidebar = action.payload;
        },
        setChatRoom: function(state, action) {
            state.showChatRoom = action.payload;
        }
    },
});

const homePageReducer = homePageSlice.reducer;
const homePageActions = homePageSlice.actions;

export { homePageReducer, homePageActions };
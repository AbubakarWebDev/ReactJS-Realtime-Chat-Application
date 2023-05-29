import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSidebar: false,
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setSearchUserSidebar: function(state, action) {
            state.showSidebar = action.payload;
        }
    },
});

const homePageReducer = homePageSlice.reducer;
const homePageActions = homePageSlice.actions;

export { homePageReducer, homePageActions };
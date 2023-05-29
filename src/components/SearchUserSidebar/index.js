import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatListItem from '../ChatList/ChatListItem';
import OffCanvasSidebar from '../OffCanvasSidebar';

import { homePageActions } from '../../store/slices/homePageSlice';

function SearchUserSidebar() {
    const dispatch = useDispatch()
    const showSidebar = useSelector((state) => state.homePage.showSidebar);

    return (
        <OffCanvasSidebar
            title="Users List"
            show={showSidebar}
            handleClose={() => dispatch(homePageActions.setSearchUserSidebar(false))}
        >
            <form className="d-flex mb-2" role="search">
                <input className="form-control me-2" type="search" placeholder="Search Friends" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            <ChatListItem
                name="John Doe wejfkewhfkwjkfhwe fwkfhwkef kwjeh"
                avatarUrl="https://ui-avatars.com/api/?bold=true&size=150&background=random&name=KA"
                lastMsgText="Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
                lastMsgTime="10:31 AM"
            />

            <ChatListItem
                name="John Doe"
                avatarUrl="https://ui-avatars.com/api/?bold=true&size=150&background=random&name=ML"
                lastMsgText="Lorem ipsum dolor sit amet"
                lastMsgTime="10:31 AM"
            />
        </OffCanvasSidebar>
    );
}

export default SearchUserSidebar;
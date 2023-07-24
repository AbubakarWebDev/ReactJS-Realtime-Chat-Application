import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import OffCanvasSidebar from '../OffCanvasSidebar';
import ChatListItem from '../ChatList/ChatListItem';

import { capatalize } from '../../utils';
import RequestLoader from '../RequestLoader';
import { getorCreateChats } from '../../store/slices/chatSlice';
import { homePageActions } from '../../store/slices/homePageSlice';
import { userActions, getAllUsers } from '../../store/slices/userSlice';

function SearchUserSidebar() {
    const timeoutId = useRef(null);
    const userController = useRef({ abort: () => { } });
    const chatController = useRef({ abort: () => { } });

    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);
    const showSidebar = useSelector((state) => state.homePage.showSidebar);

    function handleChange(event) {
        const searchTerm = event.target.value.trim();

        if (searchTerm) {
            clearTimeout(timeoutId.current);
            userController.current.abort();
    
            timeoutId.current = setTimeout(() => {
                const promise = dispatch(getAllUsers(searchTerm));
                userController.current.abort = promise.abort;
            }, 500);
        }
    }

    function handleUserClick(userId) {
        dispatch(homePageActions.setSearchUserSidebar(false));

        const promise = dispatch(getorCreateChats({ userId }));
        userController.current.abort = promise.abort;
    }
    
    useEffect(() => {
        dispatch(userActions.setError(null));

        return () => {
            userController.current.abort();
            chatController.current.abort();
            clearTimeout(timeoutId);
        }
    }, []);

    return (
        <OffCanvasSidebar
            title="Users List"
            show={showSidebar}
            handleClose={() => dispatch(homePageActions.setSearchUserSidebar(false))}
        >
            <input
                type="search"
                placeholder="Search Friends"
                className="form-control mb-2"
                onChange={handleChange}
            />

            {(loading || error) ? (
                <RequestLoader />
            ) : (
                <div className="chatList">
                    {users ? users.length ? users.map(user => {
                        const fullName = `${capatalize(user.firstName)} ${capatalize(user.lastName)}`;
                        const email = <span><b>Email: </b> {user.email}</span>;

                        return (
                            <ChatListItem
                                key={user._id}
                                name={fullName}
                                lastMsgText={email}
                                handleClick={() => handleUserClick(user._id)}
                                avatarUrl={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
                            />
                        );
                    }) : (
                        <div className="text-center mt-5 fs-4">
                            <b>Searched User is Not Found (:</b>
                        </div> 
                    ) : (
                        <div className="text-center mt-5 fs-4">
                            <b>Find Your Friends....</b>
                        </div>
                    )}
                </div>
            )}
        </OffCanvasSidebar>
    );
}

export default SearchUserSidebar;
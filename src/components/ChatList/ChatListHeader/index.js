import React from 'react';
import { HiPlusCircle } from 'react-icons/hi';

import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { homePageActions } from '../../../store/slices/homePageSlice';
import { FiArrowRight } from 'react-icons/fi';
const { chatListHeader, toggleBtn } = styles;

function ChatListHeader({ handleClick }) {

    const dispatch = useDispatch();

    return (
        <div className={chatListHeader}>
            <h4>My Chats</h4>

            <button
                type="button"
                onClick={handleClick}
                className="btn btn-dark d-flex align-items-center"
            >
                <span className="me-2">New Group Chat</span>
                <HiPlusCircle />
            </button>

            <button
                className={`btn btn-dark ${toggleBtn}`}
                onClick={() => dispatch(homePageActions.setChatRoom(true))}
            >
                <FiArrowRight />
            </button>
        </div>
    )
}

export default React.memo(ChatListHeader);
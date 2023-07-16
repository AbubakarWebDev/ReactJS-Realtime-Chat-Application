import React from 'react';
import { HiPlusCircle } from 'react-icons/hi';

import styles from './style.module.scss';
const { chatListHeader } = styles;

function ChatListHeader({ handleClick }) {
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
        </div>
    )
}

export default React.memo(ChatListHeader);
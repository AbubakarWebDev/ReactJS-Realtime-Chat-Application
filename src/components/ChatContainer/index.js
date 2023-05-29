import React from 'react';

import ChatList from '../ChatList';
import ChatRoom from '../ChatRoom';

import styles from "./style.module.scss";

function ChatContainer() {
    const { chatContainer, chatList, chatRoom } = styles;

    return (
        <div className={chatContainer}>
            <div className={chatList}>
                <ChatList />
            </div>
            <div className={chatRoom}>
                <ChatRoom />
            </div>
        </div>
    )
}

export default ChatContainer;
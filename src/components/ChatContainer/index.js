import React from 'react';
import { useSelector } from "react-redux";

import ChatList from '../ChatList';
import ChatRoom from '../ChatRoom';

import useOnlineStatus from "../../hooks/useOnlineUsers";

import styles from "./style.module.scss";
const { chatContainer, chatList, chatRoom } = styles;

function ChatContainer() {
    const user = useSelector((state) => state.user.user);
    const onlineUsers = useOnlineStatus(user);

    return (
        <div className={chatContainer}>
            <div className={chatList}>
                <ChatList onlineUsers={onlineUsers} user={user} />
            </div>
            <div className={chatRoom}>
                <ChatRoom onlineUsers={onlineUsers} user={user} />
            </div>
        </div>
    )
}

export default ChatContainer;
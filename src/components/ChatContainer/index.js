import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import socket from "../../socket";
import ChatList from '../ChatList';
import ChatRoom from '../ChatRoom';

import { messageActions } from "../../store/slices/messageSlice";

import useOnlineStatus from "../../hooks/useOnlineUsers";

import styles from "./style.module.scss";
const { chatContainer, chatList, chatRoom } = styles;

function ChatContainer() {
    const chatContainerRef = useRef(null);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const onlineUsers = useOnlineStatus(user);

    function scrollChatToBottom() {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        socket.connect();

        const onReceiveMessage = (message) => {
            dispatch(messageActions.pushMessage(message));
            requestAnimationFrame(scrollChatToBottom);
        }

        socket.on("receiveMessage", onReceiveMessage);

        return () => {
            socket.off("receiveMessage", onReceiveMessage);
        }
    }, []);

    return (
        <div className={chatContainer}>
            <div className={chatList}>
                <ChatList onlineUsers={onlineUsers} user={user} />
            </div>
            <div className={chatRoom}>
                <ChatRoom ref={chatContainerRef} onlineUsers={onlineUsers} user={user} />
            </div>
        </div>
    )
}

export default ChatContainer;
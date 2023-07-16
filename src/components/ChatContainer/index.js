import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import socket from "../../socket";
import ChatList from '../ChatList';
import ChatRoom from '../ChatRoom';

import { messageActions } from "../../store/slices/messageSlice";

import useOnlineStatus from "../../hooks/useOnlineUsers";
import useMediaQuery from "../../hooks/useMediaQuery";

import styles from "./style.module.scss";
const { chatContainer, chatList, chatRoom } = styles;

function ChatContainer() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const showChatRoom = useSelector((state) => state.homePage.showChatRoom);

    const chatContainerRef = useRef(null);
    const onlineUsers = useOnlineStatus(user);
    const mobileMatches = useMediaQuery(`(max-width: 1100px)`);

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
            <div 
                className={chatList} 
                style={mobileMatches ? { display: showChatRoom ? "none" : "block" } : {}}
            >
                <ChatList onlineUsers={onlineUsers} user={user} />
            </div>

            <div 
                className={chatRoom} 
                style={mobileMatches ? { display: showChatRoom ? "block" : "none" } : {}}
            >
                <ChatRoom ref={chatContainerRef} onlineUsers={onlineUsers} user={user} />
            </div>
        </div>
    )
}

export default ChatContainer;
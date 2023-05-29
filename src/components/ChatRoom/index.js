import React from 'react';
import { AiOutlineWechat } from "react-icons/ai";

import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

import styles from "./style.module.scss";

function ChatRoom() {
    const chat = 1;
    const { chatRoomContainer, chatIcon } = styles;

    return (
        <div className={chatRoomContainer}>
            {chat > 0 ? (
                <>
                    <ChatHeader userName="John Doe" />
                    <ChatMessageList />
                    <ChatInput />
                </>
            ) : (
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <AiOutlineWechat className={chatIcon} />
                    <h3>Click on a user to start chatting</h3>
                </div>
            )}
        </div>
    );
}

export default ChatRoom;
import React, { useState } from 'react';
import { AiOutlineWechat } from "react-icons/ai";
import { useSelector } from "react-redux";

import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatProfileModal from "../ChatProfileModal";

import { getSender, capatalize } from '../../utils';

import styles from "./style.module.scss";
const { chatRoomContainer, chatIcon } = styles;

function ChatRoom() {
    const [openChatProfileModal, setOpenChatProfileModal] = useState(false);

    const user = useSelector((state) => state.user.user);
    const chat = useSelector((state) => state.chat.activeChat);

    function updateProfile(data) {
        console.log(data);
    }

    return (
        <div className={chatRoomContainer}>
            {(user && chat) ? (
                <>
                    <ChatHeader 
                        userName={
                            chat.isGroupChat 
                                ? chat.chatName 
                                : `${capatalize(getSender(user, chat.users).firstName)} ${getSender(user, chat.users).lastName}`
                        }
                        handleClick={() => setOpenChatProfileModal(true)}
                    />
                    <ChatMessageList />
                    <ChatInput />

                    <ChatProfileModal 
                        user={user}
                        activeChat={chat}
                        onSubmit={updateProfile}
                        show={openChatProfileModal}
                        setShow={setOpenChatProfileModal}
                    />
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
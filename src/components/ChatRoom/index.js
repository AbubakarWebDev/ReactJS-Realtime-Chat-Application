import React, { useState } from 'react';
import { AiOutlineWechat } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatProfileModal from "../ChatProfileModal";

import { getSender, capatalize } from '../../utils';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./style.module.scss";
const { chatRoomContainer, chatIcon } = styles;

function ChatRoom() {
    const [openChatProfileModal, setOpenChatProfileModal] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const chat = useSelector((state) => state.chat.activeChat);

    function updateProfile(formData) {

        console.log(formData);

        

        if (formData.groupName) {
            
        }

        if (formData.groupName) {
            
        }

        if (formData.groupAdmins) {
            
        }
    }

    function handleLeaveGroup() {
        if (chat.groupAdmins.length === 1) {
            toast.error('Error: Unable to leave the group. As the sole admin, you must first assign another user as an admin before leaving', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            console.log("handleLeaveGroup");
        }
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

                    <ToastContainer />

                    <ChatProfileModal
                        user={user}
                        activeChat={chat}
                        onSubmit={updateProfile}
                        show={openChatProfileModal}
                        onLeaveGroup={handleLeaveGroup}
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
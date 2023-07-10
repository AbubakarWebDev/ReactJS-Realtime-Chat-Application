import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineWechat } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatProfileModal from "../ChatProfileModal";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getSender, capatalize, isEqualArrayOfObject } from '../../utils';
import {
    updateGroupAdmins,
    updateGroupUsers,
    renameGroupName,
    removeUserFromGroup
} from "../../store/slices/chatSlice";

import styles from "./style.module.scss";
const { chatRoomContainer, chatIcon } = styles;

function ChatRoom() {
    const controllers = useRef([
        () => { },
        () => { },
        () => { },
        () => { },
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [mountModal, setMountModal] = useState(false);
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const chat = useSelector((state) => state.chat.activeChat);

    async function updateProfile(formData) {
        if (formData.groupName !== chat.chatName) {
            const payload = {
                chatId: chat._id,
                chatName: formData.groupName
            }

            const promise = dispatch(renameGroupName(payload));
            controllers.current[0] = promise.abort;

            await promise;
        }

        var isGroupAdmin = chat.groupAdmins.some(groupAdmin => groupAdmin._id === user._id);

        if (chat.isGroupChat && isGroupAdmin) {
            if (!isEqualArrayOfObject(formData.users, chat.users, { "value": "_id" })) {
                const payload = {
                    chatId: chat._id,
                    users: formData.users.map((user) => user.value)
                };

                const promise = dispatch(updateGroupUsers(payload));
                controllers.current[1] = promise.abort;

                await promise;
            }

            if (!isEqualArrayOfObject(formData.groupAdmins, chat.groupAdmins, { "value": "_id" })) {
                const payload = {
                    chatId: chat._id,
                    users: formData.groupAdmins.map((user) => user.value)
                };

                const promise = dispatch(updateGroupAdmins(payload));
                controllers.current[2] = promise.abort;

                await promise;
            }
        }

        setOpenModal(false);
    }

    function handleLeaveGroup() {
        if (chat.groupAdmins.length === 1 && chat.groupAdmins[0]._id === user._id) {
            toast.error('Error: Unable to leave the group. As the sole admin, you must first assign another user as an admin before leaving');
        }
        else {
            const payload = {
                userId: user._id,
                chatId: chat._id,
            }

            const promise = dispatch(removeUserFromGroup(payload));
            controllers.current[3] = promise.abort;

            promise.unwrap().then(() => {
                setOpenModal(false);
            });
        }
    }

    useEffect(() => {
        return () => {
            controllers.current.forEach(abort => abort());
        }
    }, []);

    return (
        <div className={chatRoomContainer}>
            {(user && chat) ? (
                <>
                    <ChatHeader
                        handleClick={() => {
                            setMountModal(true);
                            setOpenModal(true);
                        }}
                        userName={
                            chat.isGroupChat
                                ? chat.chatName
                                : `${capatalize(getSender(user, chat.users).firstName)} 
                                    ${capatalize(getSender(user, chat.users).lastName)}`
                        }
                    />

                    <ChatMessageList 
                        chat={chat}
                        user={user}
                    />

                    <ChatInput chat={chat} />

                    <ToastContainer
                        autoClose={5000}
                        draggable={true}
                        position="top-right"
                        closeOnClick={true}
                        pauseOnHover={true}
                        hideProgressBar={false}
                    />

                    {mountModal && (
                        <ChatProfileModal
                            user={user}
                            chat={chat}
                            show={openModal}
                            onSubmit={updateProfile}
                            onLeaveGroup={handleLeaveGroup}
                            onHide={() => setOpenModal(false)}
                            unMountModal={() => setMountModal(false)}
                        />
                    )}
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
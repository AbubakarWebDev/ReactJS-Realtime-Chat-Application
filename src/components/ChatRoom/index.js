import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AiOutlineWechat } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";

import socket from "../../socket";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatProfileModal from "../ChatProfileModal";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    updateGroupAdmins,
    updateGroupUsers,
    renameGroupName,
    removeUserFromGroup
} from "../../store/slices/chatSlice";
import { homePageActions } from '../../store/slices/homePageSlice';
import { getSender, capatalize, isEqualArrayOfObject, findArrayDiff } from '../../utils';

import styles from "./style.module.scss";
const { chatRoomContainer, chatIcon, toggleBtn } = styles;

function ChatRoom({ user, onlineUsers }, ref) {
    const controllers = useRef([
        () => { },
        () => { },
        () => { },
        () => { },
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [mountModal, setMountModal] = useState(false);

    const dispatch = useDispatch();
    const chat = useSelector((state) => state.chat.activeChat);

    const updateProfile = useCallback(async (formData) => {
        var updatedChat = null;

        if (formData.groupName !== chat.chatName) {
            const payload = {
                chatId: chat._id,
                chatName: formData.groupName
            }

            const promise = dispatch(renameGroupName(payload));
            controllers.current[0] = promise.abort;

            updatedChat = await promise.unwrap();
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

                updatedChat = await promise.unwrap();
            }

            if (!isEqualArrayOfObject(formData.groupAdmins, chat.groupAdmins, { "value": "_id" })) {
                const payload = {
                    chatId: chat._id,
                    users: formData.groupAdmins.map((user) => user.value)
                };

                const promise = dispatch(updateGroupAdmins(payload));
                controllers.current[2] = promise.abort;

                updatedChat = await promise.unwrap();
            }
        }

        if (updatedChat) {
            const { addedEntries, removedEntries } = findArrayDiff([
                ...chat.users, 
                ...chat.groupAdmins
            ], [
                ...updatedChat.users, 
                ...updatedChat.groupAdmins
            ]);

            socket.emit("updateGroupChat", { 
                userId: user._id,
                chat: updatedChat,
                addedUser: addedEntries,
                removedUser: removedEntries
            });
        }

        setOpenModal(false);
    }, [chat, user]);

    const handleLeaveGroup = useCallback(() => {
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
    }, [user, chat]);

    const handleChatHeaderClick = useCallback(() => {
        setMountModal(true);
        setOpenModal(true);
    }, []);

    const onHide = useCallback(() => setOpenModal(false), []);
    const unMountModal = useCallback(() => setMountModal(false), []);

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
                        handleClick={handleChatHeaderClick}
                        isOnline={
                            (!chat.isGroupChat && onlineUsers[getSender(user, chat.users)._id]) ? true : false
                        }
                        userName={
                            chat.isGroupChat
                                ? chat.chatName
                                : `${capatalize(getSender(user, chat.users).firstName)} 
                                    ${capatalize(getSender(user, chat.users).lastName)}`
                        }
                    />

                    <ChatMessageList
                        ref={ref}
                        user={user}
                        chatId={chat._id}
                        chatUnReadCount={chat.unReadCount}
                    />

                    <ChatInput
                        user={user}
                        chatId={chat._id}
                        messageContainerRef={ref}
                    />

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
                            onHide={onHide}
                            show={openModal}
                            onSubmit={updateProfile}
                            unMountModal={unMountModal}
                            onLeaveGroup={handleLeaveGroup}
                        />
                    )}
                </>
            ) : (
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <button
                        className={`btn btn-dark ${toggleBtn}`}
                        onClick={() => dispatch(homePageActions.setChatRoom(false))}
                    >
                        <FiArrowLeft />
                    </button>

                    <AiOutlineWechat className={chatIcon} />

                    <h3>Click on a user to start chatting</h3>
                </div>
            )}
        </div>
    );
}

export default React.memo(React.forwardRef(ChatRoom));
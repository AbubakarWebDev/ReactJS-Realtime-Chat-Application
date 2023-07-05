import React, { useEffect, useRef, useState } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector, useDispatch } from "react-redux";

import ChatListItem from "./ChatListItem";
import RequestLoader from './../RequestLoader';
import CreateGroupChatModal from './../CreateGroupChatModal';
import { getAllChats, chatActions, createGroupChat } from '../../store/slices/chatSlice';

import { getSender, capatalize, elipsis, convertTo12HourFormat } from '../../utils';

import styles from "./style.module.scss";
const { chatListContainer, chatListHeader } = styles;

function ChatList() {
  const chatController = useRef({ abort: () => { } });
  const groupController = useRef({ abort: () => { } });
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const {
    error,
    chats, 
    loading,
    activeChat,
    createdChat,
    createdGroupChat
  } = useSelector((state) => state.chat);

  useEffect(() => {
    const promise = dispatch(getAllChats());
    chatController.current.abort = promise.abort;

    return () => {
      chatController.current.abort();
      groupController.current.abort();
    }
  }, [createdChat, createdGroupChat]);

  function handleGroupChat(formData) {
    let payload = {
      chatName: formData.groupName,
      users: [...formData.users]
    };

    const promise = dispatch(createGroupChat(payload));
    groupController.current.abort = promise.abort;

    promise.unwrap().then(() => {
      setOpenGroupModal(false);
    })
  }

  return (
    <div className={chatListContainer}>
      <div className={chatListHeader}>
        <h4>My Chats</h4>

        <button
          type="button"
          onClick={() => setOpenGroupModal(true)}
          className="btn btn-light btn-outline-dark d-flex align-items-center"
        >
          <span className="me-2">New Group Chat</span>
          <HiPlusCircle />
        </button>
      </div>

      <CreateGroupChatModal
        show={openGroupModal}
        onSubmit={handleGroupChat}
        setShow={setOpenGroupModal}
      />

      {(loading || error) ? (
        <RequestLoader />
      ) : (chats && user) ? (
        <div className="chatList">
          {chats.map(chat => {
            const sender = getSender(user, chat.users);
            const isActive = chat._id === (activeChat && activeChat._id);
            const avatar = chat.isGroupChat ? chat.groupIcon : sender.avatar;
            const lastMsgText = sender.latestMessage && elipsis(sender.latestMessage.content);
            const lastMsgTime = sender.latestMessage && convertTo12HourFormat(sender.latestMessage.createdAt);
            const chatName = chat.isGroupChat ? chat.chatName : `${capatalize(sender.firstName)} ${capatalize(sender.lastName)}`;

            return (
              <ChatListItem
                key={chat._id}
                name={chatName}
                isActive={isActive}
                lastMsgText={lastMsgText}
                lastMsgTime={lastMsgTime}
                avatarUrl={`${process.env.REACT_APP_SERVER_BASE_URL}/${avatar}`}
                handleClick={() => dispatch(chatActions.setActiveChat(chat))}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-5 fs-3">
          <b>No Chats Found</b>
        </div>
      )}
    </div>
  );
}

export default ChatList;
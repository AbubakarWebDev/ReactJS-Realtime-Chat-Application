import { produce } from "immer";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';

import socket from "../../socket";
import ChatListItem from "./ChatListItem";
import RequestLoader from './../RequestLoader';
import CreateGroupChatModal from './../CreateGroupChatModal';
import { getAllChats, chatActions, createGroupChat } from '../../store/slices/chatSlice';

import { getSender, capatalize, elipsis, convertTo12HourFormat } from '../../utils';

import styles from "./style.module.scss";
import { useCallback } from 'react';
import ChatListHeader from "./ChatListHeader";
const { chatListContainer, userChatList } = styles;

function ChatList({ user, onlineUsers }) {
  const [openModal, setOpenModal] = useState(false);
  const [mountModal, setMountModal] = useState(false);

  const chatController = useRef({ abort: () => { } });
  const groupController = useRef({ abort: () => { } });

  const dispatch = useDispatch();
  const { error, chats, loading, activeChat } = useSelector((state) => state.chat);

  useEffect(() => {
    const promise = dispatch(getAllChats());
    chatController.current.abort = promise.abort;

    socket.on("joinGroupChat", (chat) => {
      console.log("joinGroupChat", chat);
      dispatch(chatActions.pushNewChat(chat));
    });

    socket.on("updatedGroupChat", (chat) => {
      console.log("updatedGroupChat", chat);
      dispatch(chatActions.updateChat(chat));
    });

    socket.on("deleteGroupChat", (chatId) => {
      console.log("deleteGroupChat", chatId);
      dispatch(chatActions.deleteChat(chatId));
    });

    return () => {
      chatController.current.abort();
      groupController.current.abort();
    }
  }, []);

  const handleGroupChat = useCallback((formData) => {
    const payload = produce(formData, (draft) => {
      draft.chatName = draft.groupName;
      draft.users = draft.users.map(user => user.value);

      delete draft.groupName;
    });

    const promise = dispatch(createGroupChat(payload));
    groupController.current.abort = promise.abort;

    promise.unwrap().then((chat) => {
      setOpenModal(false);
      socket.emit("joinNewGroupChat", { chat, userId: user._id });
    });
  }, [dispatch])

  const handleChatClick = useCallback((chat) => {
    dispatch(chatActions.setActiveChat(chat));
    socket.emit('joinChat', chat._id);
  }, [dispatch]);

  const handleHeaderClick = useCallback(() => {
    setMountModal(true);
    setOpenModal(true);
  }, []);

  const onHide = useCallback(() => setOpenModal(false), []);
  const unMountModal = useCallback(() => setMountModal(false), []);

  return (
    <div className={chatListContainer}>
      <ChatListHeader handleClick={handleHeaderClick} />

      {mountModal && (<CreateGroupChatModal
        onHide={onHide}
        show={openModal}
        onSubmit={handleGroupChat}
        unMountModal={unMountModal}
      />)}

      {(loading || error) ? (
        <RequestLoader />
      ) : (chats && user && chats.length > 0) ? (
        <div className={userChatList}>
          {chats.map(chat => {

            const isActive = chat._id === (activeChat && activeChat._id);

            if (chat.isGroupChat) {
              var avatar = chat.groupIcon;
              var chatName = chat.chatName;

              var lastMsgText = chat.latestMessage && elipsis(
                `~${capatalize(chat.latestMessage.sender.firstName)} ${capatalize(chat.latestMessage.sender.lastName)}: ${chat.latestMessage.content}`
              );
            }
            else {
              const sender = getSender(user, chat.users);

              avatar = sender.avatar;
              chatName = `${capatalize(sender.firstName)} ${capatalize(sender.lastName)}`;
              lastMsgText = chat.latestMessage && elipsis(chat.latestMessage.content);
              var isOnline = (onlineUsers[sender._id]) ? true : false;
            }

            const lastMsgTime = chat.latestMessage && convertTo12HourFormat(chat.latestMessage.createdAt);

            return (
              <ChatListItem
                chat={chat}
                key={chat._id}
                name={chatName}
                isOnline={isOnline}
                isActive={isActive}
                lastMsgText={lastMsgText}
                lastMsgTime={lastMsgTime}
                handleClick={handleChatClick}
                unReadCount={chat.unReadCount}
                avatarUrl={`${process.env.REACT_APP_SERVER_BASE_URL}/${avatar}`}
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

export default React.memo(ChatList);
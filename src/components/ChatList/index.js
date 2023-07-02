import React, { useEffect, useRef } from 'react';
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector, useDispatch } from "react-redux";

import ChatListItem from "./ChatListItem";
import RequestLoader from './../RequestLoader';
import { getAllChats, chatActions } from '../../store/slices/chatSlice';

import styles from "./style.module.scss";
import { getSender, capatalize, elipsis, convertTo12HourFormat } from '../../utils';
const { chatListContainer, chatListHeader } = styles;

function ChatList() {
  const dispatch = useDispatch();
  const controller = useRef({ abort: () => {} });

  const user = useSelector((state) => state.user.user);
  const { loading, error, chats, activeChat } = useSelector((state) => state.chat);

  useEffect(() => {
    const promise = dispatch(getAllChats());
    controller.current.abort = promise.abort;

    return () => { 
      controller.current.abort();
    }
  }, []);

  function handleGroupClick() {
    
  }

  return (
    <div className={chatListContainer}>
      <div className={chatListHeader}>
        <h4>My Chats</h4>

        <button type="button" className="btn btn-light btn-outline-dark d-flex align-items-center">
          <span className="me-2" onClick={handleGroupClick}>New Group Chat</span>
          <HiPlusCircle />
        </button>
      </div>

      {(loading || error) ? (
        <RequestLoader />
      ) : chats ? (
        <div className="chatList">
          {chats.map(chat => {
            const sender = getSender(user, chat.users);
            const chatName = `${capatalize(sender.firstName)} ${capatalize(sender.lastName)}`;
            const lastMsgText = sender.latestMessage && elipsis(sender.latestMessage.content);
            const lastMsgTime = sender.latestMessage && convertTo12HourFormat(sender.latestMessage.createdAt);

            return (
              <ChatListItem
                key={chat._id}
                lastMsgText={lastMsgText}
                lastMsgTime={lastMsgTime}
                name={chat.isGroupChat ? chat.chatName : chatName}
                isActive={chat._id === (activeChat && activeChat._id)}
                handleClick={() => dispatch(chatActions.setActiveChat(chat))}
                avatarUrl={`${process.env.REACT_APP_SERVER_BASE_URL}/${sender.avatar}`}
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
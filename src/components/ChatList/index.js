import { produce } from "immer";
import { HiPlusCircle } from 'react-icons/hi';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';

import ChatListItem from "./ChatListItem";
import RequestLoader from './../RequestLoader';
import CreateGroupChatModal from './../CreateGroupChatModal';
import { getAllChats, chatActions, createGroupChat } from '../../store/slices/chatSlice';

import { getSender, capatalize, elipsis, convertTo12HourFormat } from '../../utils';

import styles from "./style.module.scss";
const { chatListContainer, chatListHeader, userChatList } = styles;

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
    
    return () => {
      chatController.current.abort();
      groupController.current.abort();
    }
  }, []);

  function handleGroupChat(formData) {
    const payload = produce(formData, (draft) => {
      draft.chatName = draft.groupName;
      draft.users = draft.users.map(user => user.value);

      delete draft.groupName;
    });

    const promise = dispatch(createGroupChat(payload));
    groupController.current.abort = promise.abort;

    promise.unwrap().then(() => {
      setOpenModal(false);
    });
  }

  return (
    <div className={chatListContainer}>
      <div className={chatListHeader}>
        <h4>My Chats</h4>

        <button
          type="button"
          className="btn btn-dark d-flex align-items-center"
          onClick={() => {
            setMountModal(true);
            setOpenModal(true);
          }}
        >
          <span className="me-2">New Group Chat</span>
          <HiPlusCircle />
        </button>
      </div>

      {mountModal && (<CreateGroupChatModal
        show={openModal}
        onSubmit={handleGroupChat}
        onHide={() => setOpenModal(false)}
        unMountModal={() => setMountModal(false)}
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
                key={chat._id}
                name={chatName}
                isOnline={isOnline}
                isActive={isActive}
                lastMsgText={lastMsgText}
                lastMsgTime={lastMsgTime}
                handleClick={() => dispatch(chatActions.setActiveChat(chat))}
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
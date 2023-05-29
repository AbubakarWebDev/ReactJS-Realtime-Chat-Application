import React from 'react';
import { HiPlusCircle } from 'react-icons/hi';

import ChatListItem from "./ChatListItem";

import styles from "./style.module.scss";

function ChatList() {
  const { chatListContainer, chatListHeader } = styles;

  return (
    <div className={chatListContainer}>
      <div className={chatListHeader}>
        <h4>My Chats</h4>

        <button type="button" className="btn btn-light btn-outline-dark d-flex align-items-center">
          <span className="me-2">New Group Chat</span>
          <HiPlusCircle />
        </button>
      </div>

      <ChatListItem
        name="John Doe wejfkewhfkwjkfhwe fwkfhwkef kwjeh"
        avatarUrl="https://ui-avatars.com/api/?bold=true&size=150&background=random&name=KA"
        lastMsgText="Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
        lastMsgTime="10:31 AM"
      />

      <ChatListItem
        name="John Doe"
        avatarUrl="https://ui-avatars.com/api/?bold=true&size=150&background=random&name=ML"
        lastMsgText="Lorem ipsum dolor sit amet"
        lastMsgTime="10:31 AM"
      />
    </div>
  );
}

export default ChatList;
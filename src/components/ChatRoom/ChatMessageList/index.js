import React from 'react';

import styles from "./style.module.scss";

import ChatMessage from "./ChatMessage";

function ChatList() {
  const { chatMessageListContainer } = styles;

  return (
    <div className={chatMessageListContainer}>
      <ChatMessage
        message="Hey! How are you doing?"
        timestamp="10:44 AM"
        sender="John Doe"
        avatarUrl="https://ui-avatars.com/api/?bold=true&size=40&background=random&name=John+Doe"
        incoming={false}
      />
      <ChatMessage
        message=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis explicabo magni cupiditate quisquam nihil inventore suscipit eum repudiandae, doloremque numquam amet illo omnis nostrum voluptatibus, deleniti iste. Reiciendis, quas! Illum at qui aut possimus. Sed praesentium ad minus error architecto perspiciatis cumque molestiae laboriosam? Perferendis, sequi! Vitae blanditiis veniam totam?"
        timestamp="10:45 AM"
        sender="Muhammad Abubakar"
        avatarUrl="https://ui-avatars.com/api/?bold=true&size=40&background=random&name=Muhammad+Abubakar"
        incoming={true}
      />
    </div>
  );
}

export default ChatList;
import React from 'react';

import styles from "./style.module.scss";

function ChatMessage({ message, timestamp, sender,  avatarUrl, incoming = false }) {

  const { chatMessageContainer, chatMessage, chatMessageHeader, incomingMsg, avatar  } = styles;
  
  return (
    <div className={`${chatMessageContainer} ${incoming ? incomingMsg : ""}`}>
      {avatarUrl && <img src={avatarUrl} alt="Avatar" className={avatar} />}
      
      <div className={`${chatMessage} ${incoming ? incomingMsg : ""}`}>
        {sender && <h3 className={chatMessageHeader}> {sender} </h3>}
        <p>{message}</p>
        <span>{timestamp}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
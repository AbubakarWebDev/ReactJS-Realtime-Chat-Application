import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { capatalize, convertTo12HourFormat } from '../../../../utils';
import { updateReadBy } from '../../../../store/slices/messageSlice';

import styles from "./style.module.scss";
const { chatMessageContainer, chatMessage, chatMessageHeader, incomingMsg, avatar } = styles;

function ChatMessage({ message, user }) {

  const dispatch = useDispatch();

  const incoming = message.sender._id !== user._id;
  const isMsgRead = message.readBy.find(ruser => ruser === user._id);

  useEffect(() => {
    if (incoming && !isMsgRead) {
      dispatch(updateReadBy({ messageId: message._id }));
    }
  }, []);

  return (
    <div className={`${chatMessageContainer} ${incoming ? incomingMsg : ""}`}>
      <img
        alt="Avatar"
        className={`${avatar} rounded-circle border`}
        src={`${process.env.REACT_APP_SERVER_BASE_URL}/${message.sender.avatar}`}
      />

      <div className={`${chatMessage} ${incoming ? incomingMsg : ""}`}>
        <h3 className={chatMessageHeader}>
          {`${capatalize(message.sender.firstName)} ${capatalize(message.sender.lastName)}`}
        </h3>

        <p>{message.content}</p>

        <span>{convertTo12HourFormat(message.createdAt)}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
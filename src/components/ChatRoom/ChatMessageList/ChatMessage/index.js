import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { capatalize, convertTo12HourFormat } from '../../../../utils';
import { updateReadBy } from '../../../../store/slices/messageSlice';
import { chatActions } from '../../../../store/slices/chatSlice';

import styles from "./style.module.scss";
const { chatMessageContainer, chatMessage, chatMessageHeader, incomingMsg, avatar } = styles;

function ChatMessage({ message, user }) {
  const dispatch = useDispatch();
  const controller = useRef({ abort: () => {} });

  useEffect(() => {
    if ((message.sender._id !== user._id) && !message.readBy.some(ruser => ruser === user._id)) {
      const promise = dispatch(updateReadBy({ messageId: message._id }));
      controller.current.abort = promise.abort;
    }

    return () => {
      controller.current.abort();
    }
  }, []);

  return (
    <div className={`${chatMessageContainer} ${(message.sender._id !== user._id) ? incomingMsg : ""}`}>
      <img
        alt="Avatar"
        className={`${avatar} rounded-circle border`}
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${message.sender.avatar}`}
      />

      <div className={`${chatMessage} ${(message.sender._id !== user._id) ? incomingMsg : ""}`}>
        <h3 className={chatMessageHeader}>
          {`${capatalize(message.sender.firstName)} ${capatalize(message.sender.lastName)}`}
        </h3>

        <p>{message.content}</p>

        <span>{convertTo12HourFormat(message.createdAt)}</span>
      </div>
    </div>
  );
}

export default React.memo(ChatMessage);
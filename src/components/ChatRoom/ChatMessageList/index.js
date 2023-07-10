import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import ChatMessage from "./ChatMessage";
import RequestLoader from "../../RequestLoader";

import { capatalize, convertTo12HourFormat } from '../../../utils';
import { getAllMessages } from "../../../store/slices/messageSlice";

import styles from "./style.module.scss";
const { chatMessageListContainer } = styles;

function ChatList({ chat, user }) {
  const controller = useRef({ abort: () => { } });

  const dispatch = useDispatch();
  const { messages, message, loading, error } = useSelector((state) => state.message);

  useEffect(() => {
    const promise = dispatch(getAllMessages({ chatId: chat._id }));
    controller.current.abort = promise.abort;

    return () => {
      controller.current.abort();
    }
  }, [chat, message]);

  return (
    <div className={chatMessageListContainer}>
      {(loading || error) ? (
        <RequestLoader />
      ) : (messages && messages.length > 0) ? (
        <div className="messagesList">
          {messages.map(message => (
            <ChatMessage
              key={message._id}
              message={message.content}
              incoming={message.sender._id !== user._id}
              timestamp={convertTo12HourFormat(message.createdAt)}
              avatarUrl={`${process.env.REACT_APP_SERVER_BASE_URL}/${message.sender.avatar}`}
              sender={`${capatalize(message.sender.firstName)} ${capatalize(message.sender.lastName)}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-5 fs-3">
          <b>No Messages Found</b>
        </div>
      )}
    </div>
  );
}

export default ChatList;
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import ChatMessage from "./ChatMessage";

import { capatalize } from "../../../utils";
import { getAllMessages } from "../../../store/slices/messageSlice";

import styles from "./style.module.scss";
import socket from './../../../socket';
const { chatMessageListContainer } = styles;

function ChatMessageList({ chatId, user }, ref) {
  const [typing, setTyping] = useState(false);
  const controller = useRef({ abort: () => { } });

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  function scrollChatToBottom() {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }

  useEffect(() => {
    const promise = dispatch(getAllMessages({ chatId: chatId }));
    controller.current.abort = promise.abort;

    promise.unwrap().then(() => {
      requestAnimationFrame(scrollChatToBottom);
    });

    socket.on("startTyping", (data) => {
      if (data.chatId === chatId && data.user._id !== user._id) {
        setTyping(data.user);
      }
    });

    socket.on("stopTyping", (data) => {
      if (data.chatId === chatId && data.user._id !== user._id) {
        setTyping(false);
      }
    });

    return () => {
      controller.current.abort();
    }
  }, [chatId]);

  return (
    <div ref={ref} className={chatMessageListContainer}>
      
      {(messages && messages.length > 0) && (
        <div className="messagesList">
          {messages.map(message => (
            <ChatMessage
              user={user}
              message={message}
              key={message._id}
            />
          ))}
        </div>
      )}

      <p>
        {typing && (
          <span>{capatalize(typing.firstName)} {capatalize(typing.lastName)} is typing....</span>
        )}
      </p>
    </div>
  );
}

export default React.memo(React.forwardRef(ChatMessageList));
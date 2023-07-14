import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import socket from "../../../socket";
import ChatMessage from "./ChatMessage";

import { capatalize, convertTo12HourFormat } from '../../../utils';
import { getAllMessages, messageActions } from "../../../store/slices/messageSlice";
import { chatActions } from "../../../store/slices/chatSlice";

import styles from "./style.module.scss";
const { chatMessageListContainer } = styles;

function ChatMessageList({ chat, user }, ref) {
  const controller = useRef({ abort: () => { } });

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  function scrollChatToBottom() {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }

  useEffect(() => {
    console.log("mount");
    const promise = dispatch(getAllMessages({ chatId: chat._id }));
    controller.current.abort = promise.abort;

    promise.unwrap().then(() => {
      requestAnimationFrame(scrollChatToBottom);
    });

    return () => {
      console.log("unmount...");
      controller.current.abort();
    }
  }, [chat]);

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
    </div>
  );
}

export default React.memo(React.forwardRef(ChatMessageList));
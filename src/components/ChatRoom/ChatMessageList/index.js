import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import ChatMessage from "./ChatMessage";
import { getAllMessages } from "../../../store/slices/messageSlice";

import styles from "./style.module.scss";
const { chatMessageListContainer } = styles;

function ChatMessageList({ chatId, user }, ref) {
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

    return () => {
      controller.current.abort();
    }
  }, [chatId]);

  return (
    <div ref={ref} className={chatMessageListContainer}>
      
      {(messages && messages.length > 0) && (
        <div className="messagesList pb-3">
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
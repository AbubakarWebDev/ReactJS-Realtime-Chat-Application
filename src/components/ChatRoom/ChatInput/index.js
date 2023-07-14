import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import socket from "../../../socket";
import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../../store/slices/messageSlice";

import styles from "./style.module.scss";
const { chatInputContainer } = styles;

function ChatInput({ chat, messageContainerRef }) {
    const dispatch = useDispatch();
    const controller = useRef({ abort: () => { } });
    const [chatMessage, setMessage] = useState("");

    function handleKeyDown(event) {
        if (event.keyCode === 13) { // 13 is the Enter key code
            event.preventDefault();
            handleSubmit();
        }
    }

    function scrollChatToBottom() {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }

    function handleSubmit() {
        socket.connect();
        
        const payload = {
            chatId: chat._id,
            message: chatMessage
        };

        if (payload.message) {
            const promise = dispatch(sendMessage(payload));
            controller.current.abort = promise.abort;

            promise.unwrap().then((message) => {
                socket.emit("sendMessage", message);

                scrollChatToBottom();
                setMessage("");
            });
        }
    }

    useEffect(() => {
        return () => {
            controller.current.abort();
        }
    }, []);

    return (
        <div className={chatInputContainer}>
            <input
                type="text"
                value={chatMessage}
                onKeyDown={handleKeyDown}
                placeholder='Type a message'
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={handleSubmit}> <IoMdSend /> </button>
        </div>
    );
}

export default ChatInput;
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import socket from "../../../socket";
import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../../store/slices/messageSlice";

import styles from "./style.module.scss";
const { chatInputContainer } = styles;

function ChatInput({ chatId, messageContainerRef, user }) {
    const dispatch = useDispatch();
    const [chatMessage, setMessage] = useState("");

    const typingDelay = useRef(1000);
    const controller = useRef({ abort: () => { } });

    function scrollChatToBottom() {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }

    function handleSubmit() {
        socket.connect();

        const payload = {
            chatId: chatId,
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

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function startTyping(event) {
        clearTimeout(typingDelay.current);

        socket.emit("typing", {chatId, user});

        if (event.keyCode === 13) { // 13 is the Enter key code
            event.preventDefault();
            handleSubmit();
        }
    }

    function stopTyping() {
        clearTimeout(typingDelay.current);

        typingDelay.current = setTimeout(function () {
            socket.emit("typingOff", {chatId, user});
        }, typingDelay.current);
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
                onKeyUp={stopTyping}
                onKeyDown={startTyping}
                onChange={handleChange}
                placeholder='Type a message'
            />

            <button onClick={handleSubmit}> <IoMdSend /> </button>
        </div>
    );
}

export default React.memo(ChatInput);
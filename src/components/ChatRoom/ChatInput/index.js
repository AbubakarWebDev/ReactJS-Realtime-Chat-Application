import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../../store/slices/messageSlice";

import styles from "./style.module.scss";
const { chatInputContainer } = styles;

function ChatInput({ chat }) {
    const dispatch = useDispatch();
    const controller = useRef({ abort: () => { } });

    const [chatMessage, setMessage] = useState("");

    useEffect(() => {
        return () => {
            controller.current.abort();
        }
    }, []);

    function handleClick() {
        const payload = {
            chatId: chat._id,
            message: chatMessage
        };

        const promise = dispatch(sendMessage(payload));
        controller.current.abort = promise.abort;

        promise.unwrap().then(() => {
            setMessage("");
        });
    }

    return (
        <div className={chatInputContainer}>
            <input type="text" placeholder='Type a message' onChange={(e) => setMessage(e.target.value)} value={chatMessage} />
            <button onClick={handleClick}> <IoMdSend /> </button>
        </div>
    );
}

export default ChatInput;
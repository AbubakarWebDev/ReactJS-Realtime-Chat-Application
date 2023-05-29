import React from 'react';
import { IoMdSend } from "react-icons/io";

import styles from "./style.module.scss";

function ChatInput() {
    const { chatInputContainer } = styles;

    return (
        <div className={chatInputContainer}>
            <input type="text" placeholder='Type a message' />
            <button> <IoMdSend /> </button>
        </div>
    );
}

export default ChatInput;
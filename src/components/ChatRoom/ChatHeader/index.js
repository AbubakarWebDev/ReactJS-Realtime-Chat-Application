import React from 'react';
import { BsEyeFill } from "react-icons/bs";

import styles from "./style.module.scss";

function ChatHeader({ userName }) {
    const { chatHeaderContainer } = styles;

    return (
        <div className={chatHeaderContainer}>
            <span> { userName } </span>
            <button className='btn btn-light'> <BsEyeFill /> </button>
        </div>
    );
}

export default ChatHeader;
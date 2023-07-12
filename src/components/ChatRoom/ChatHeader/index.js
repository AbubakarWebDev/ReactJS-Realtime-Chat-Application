import React from 'react';
import { BsEyeFill } from "react-icons/bs";

import styles from "./style.module.scss";

function ChatHeader({ userName, handleClick }) {
    const { chatHeaderContainer } = styles;

    return (
        <div className={chatHeaderContainer}>
            <span> { userName } </span>
            <button className='btn btn-dark' onClick={handleClick}> 
                <BsEyeFill /> 
            </button>
        </div>
    );
}

export default ChatHeader;
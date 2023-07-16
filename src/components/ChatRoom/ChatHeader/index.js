import React from 'react';
import { BsEyeFill } from "react-icons/bs";

import styles from "./style.module.scss";
const { chatHeaderContainer, onlineUser } = styles;

function ChatHeader({ isOnline, userName, handleClick }) {

    return (
        <div className={chatHeaderContainer}>
            <span className={isOnline ? onlineUser : ""}> { userName } </span>
            <button className='btn btn-dark' onClick={handleClick}> 
                <BsEyeFill /> 
            </button>
        </div>
    );
}

export default React.memo(ChatHeader);
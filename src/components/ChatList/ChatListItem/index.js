import React from "react";
import { Image } from "react-bootstrap";

import styles from "./style.module.scss";

function ChatListItem({ name, lastMsgText, lastMsgTime, avatarUrl, isActive, handleClick }) {
    return (
        <div 
            onClick={handleClick} 
            className={`${styles.user} d-flex align-items-center ${isActive ? styles.active : ""}`}
        >
            <div className={`${styles.avatar} me-3`}>
                <Image src={avatarUrl} roundedCircle />
                {isActive && <div className={styles["active-indicator"]}></div>}
            </div>
            
            <div className={styles["user-details"]}>
                <div className="d-flex justify-content-between">
                    <h6 className={`${styles.name} mb-0`}> {name} </h6>
                    {lastMsgTime && <span className={styles["last-message-time"]}> {lastMsgTime} </span>}
                </div>
                {lastMsgText && <div className={styles["last-message-text"]}> {lastMsgText} </div>}
            </div>
        </div>
    );
};

export default ChatListItem;

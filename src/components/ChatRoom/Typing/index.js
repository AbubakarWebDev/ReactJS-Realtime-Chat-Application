import React from 'react';
import typingImg from "../../../assets/images/light.gif";

import styles from "./style.module.scss";
const { typingContainer } = styles;

function Typing({ name }) {
  return (
    <div className={typingContainer}>
        {name} is typing 
        <img src={typingImg} />
    </div>
  )
}

export default React.memo(Typing);
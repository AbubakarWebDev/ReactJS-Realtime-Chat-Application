import React from 'react';
import { useDispatch } from 'react-redux';
import { BsEyeFill } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";

import { homePageActions } from '../../../store/slices/homePageSlice';

import styles from "./style.module.scss";
const { chatHeaderContainer, onlineUser, toggleBtn } = styles;

function ChatHeader({ isOnline, userName, handleClick }) {
    const dispatch = useDispatch();

    return (
        <div className={chatHeaderContainer}>
            <button 
                className={`btn btn-dark ${toggleBtn}`} 
                onClick={() => dispatch(homePageActions.setChatRoom(false))}
            >
                <FiArrowLeft />
            </button>

            <span className={isOnline ? onlineUser : ""}> { userName } </span>
            
            <button className='btn btn-dark' onClick={handleClick}> 
                <BsEyeFill /> 
            </button>
        </div>
    );
}

export default React.memo(ChatHeader);
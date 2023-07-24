import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import GroupChatProfile from "./GroupChatProfile";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { getSender, capatalize } from '../../utils';

import styles from "./style.module.scss";
const { chatProfileOverview, chatImg } = styles;

function ChatProfileModal({ show, onHide, chat, user, unMountModal, onLeaveGroup, onSubmit }) {
    const sender = getSender(user, chat.users);

    const schemaObjShape = {
        groupName: yup.string().required('Group Name is required')
            .min(4, 'Group Name must be at least 4 characters')
            .max(25, 'Group Name cannot exceed 16 characters')
            .matches(
                /^[a-zA-Z0-9_ ]+$/,
                'Group Name can only contain alphanumeric characters and underscores'
            ),
    };

    if (chat.isGroupChat) {
        var avatar = chat.groupIcon;
        var chatName = chat.chatName;

        var isGroupAdmin = chat.groupAdmins.some(groupAdmin => groupAdmin._id === user._id);

        if (isGroupAdmin) {
            schemaObjShape.users = yup.array().of(yup.object()).min(1, 'Group Must Contains at least one User').required("Users is Required!");

            schemaObjShape.groupAdmins = yup.array().of(yup.object()).min(1, 'Group Must Contains at least one Admin').required("Group Admin is Required!");
        }
    }
    else {
        avatar = sender.avatar;
        chatName = `${capatalize(sender.firstName)} ${capatalize(sender.lastName)}`;
    }

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(yup.object().shape(schemaObjShape)),
        defaultValues: {
            groupName: chatName
        }
    });

    return (
        <Modal show={show} onHide={onHide} onExited={unMountModal} backdrop="static">
            <Modal.Header closeButton={true}> </Modal.Header>

            <Modal.Body>
                <div className={chatProfileOverview}>
                    <div className={chatImg}>
                        <img
                            alt={chatName}
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`}
                        />
                    </div>

                    <p> {chatName} </p>

                    {!chat.isGroupChat && <p className="mb-3"> {sender.email} </p>}
                </div>

                {chat.isGroupChat && (
                    <GroupChatProfile
                        user={user}
                        chat={chat}
                        errors={errors}
                        control={control}
                        register={register}
                        isGroupAdmin={isGroupAdmin}
                    />
                )}
            </Modal.Body>

            {chat.isGroupChat && (
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>Update Group Chat</Button>
                    <Button variant="danger" onClick={onLeaveGroup}>Leave Group</Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default React.memo(ChatProfileModal);
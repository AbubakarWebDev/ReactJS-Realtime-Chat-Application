import { useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import GroupChatProfile from "./GroupChatProfile";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { getSender, capatalize } from '../../utils';

import styles from "./style.module.scss";
const { chatProfileOverview, chatImg } = styles;

const schema = yup.object().shape({
    groupName: yup.string().required('Group Name is required')
        .min(4, 'Group Name must be at least 4 characters')
        .max(25, 'Group Name cannot exceed 16 characters')
        .matches(
            /^[a-zA-Z0-9_ ]+$/,
            'Group Name can only contain alphanumeric characters and underscores'
        ),
    users: yup.array().required('Group Must Contains at least one User')
});

function ChatProfileModal({ show, setShow, activeChat, user }) {
    const sender = getSender(user, activeChat.users);
    const avatar = activeChat.isGroupChat ? activeChat.groupIcon : sender.avatar;
    const chatName = activeChat.isGroupChat ? activeChat.chatName : `${capatalize(sender.firstName)} ${capatalize(sender.lastName)}`;
    
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton={true}> </Modal.Header>

            <Modal.Body>
                <div className={chatProfileOverview}>
                    <div className={chatImg}>
                        <img 
                            alt={chatName} 
                            src={`${process.env.REACT_APP_SERVER_BASE_URL}/${avatar}`} 
                        />
                    </div>
                    
                    <p> { chatName } </p>

                    {!activeChat.isGroupChat && <p> { sender.email } </p>}
                </div>

                {activeChat.isGroupChat && (
                    <GroupChatProfile 
                        register={register}
                        control={control}
                        errors={errors}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ChatProfileModal;
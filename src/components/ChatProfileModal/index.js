import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import GroupChatProfile from "./GroupChatProfile";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { getSender, capatalize, transFormIntoOptions } from '../../utils';

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
    users: yup.array().of(yup.string()).min(1, 'Group Must Contains at least one User').required("Users is Required!")
});

function ChatProfileModal({ show, setShow, activeChat, user, onSubmit }) {
    const sender = getSender(user, activeChat.users);
    const avatar = activeChat.isGroupChat ? activeChat.groupIcon : sender.avatar;

    const chatName = activeChat.isGroupChat 
        ? activeChat.chatName 
        : `${capatalize(sender.firstName)} ${capatalize(sender.lastName)}`;

    const options = transFormIntoOptions(
        activeChat.users,
        (user) => `${user.firstName} ${user.lastName}`,
        "_id",
    );

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        shouldUnregister: true,
        reValidateMode: "onChange",
        defaultValues: {
            groupName: activeChat.chatName,
            users: options
        }
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

                    <p> {chatName} </p>

                    {!activeChat.isGroupChat && <p> {sender.email} </p>}
                </div>

                {activeChat.isGroupChat && (
                    <GroupChatProfile
                        users={options}
                        errors={errors}
                        control={control}
                        chat={activeChat}
                        register={register}
                    />
                )}
            </Modal.Body>

            {activeChat.isGroupChat && (
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>Create Group Chat</Button>
                    <Button variant="danger" onClick={handleSubmit(onSubmit)}>Leave Group</Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default ChatProfileModal;
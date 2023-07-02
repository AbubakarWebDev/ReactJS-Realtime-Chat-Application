import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Image } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AsyncSelect from 'react-select/async';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { transFormIntoOptions } from "../../utils";
import { getAllUsers } from '../../store/slices/userSlice';

import styles from "./style.module.scss";
const { customOptions, userImg, userDescription } = styles;

function CustomOptionComponent(props) {
    const { avatar, email, label } = props.data;
    const { innerProps, innerRef } = props;

    return (
        <div className={customOptions} ref={innerRef} {...innerProps}>
            <div className={userImg}>
                <Image src={`${process.env.REACT_APP_SERVER_BASE_URL}/${avatar}`} roundedCircle />
            </div>

            <div className={userDescription}>
                <div> {label} </div>
                <div> <b>Email: </b> {email} </div>
            </div>
        </div>
    );
};

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

function CreateGroupChatModal({ show, setShow, onSubmit }) {
    const timeoutId = useRef(null);
    const controller = useRef({ abort: () => { } });
    const [selectedUsers, setSelectedUsers] = useState([]);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        return () => {
            controller.current.abort();
            clearTimeout(timeoutId);
        }
    }, []);

    function loadUsers(inputVal, callback) {
        clearTimeout(timeoutId.current);
        controller.current.abort();

        timeoutId.current = setTimeout(() => {
            const promise = dispatch(getAllUsers(inputVal));
            controller.current.abort = promise.abort;

            promise.unwrap().then((users) => {
                const options = transFormIntoOptions(
                    users,
                    (user) => `${user.firstName} ${user.lastName}`,
                    "_id",
                    { avatar: "avatar", email: "email" }
                );

                callback(options);
            });
        }, 500);
    }

    return (
        <Modal show={show}>
            <Modal.Header className="justify-content-center">
                <Modal.Title>Create Group Chat</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-3">
                    <input
                        type="text"
                        id="groupName"
                        className="form-control"
                        placeholder="Enter Group Name"
                        {...register("groupName")}
                    />

                    {errors.groupName && (
                        <b className="text-danger d-block mt-1">{errors.groupName.message}</b>
                    )}
                </div>

                <Controller
                    name="users"
                    control={control}
                    render={({ field: { name, onBlur, onChange } }) => (
                        <>
                            <AsyncSelect
                                name={name}
                                isMulti={true}
                                onBlur={onBlur}
                                cacheOptions={true}
                                value={selectedUsers}
                                defaultOptions={true}
                                placeholder="Add Users"
                                loadOptions={loadUsers}
                                isLoading={loading || error}
                                components={{ Option: CustomOptionComponent }}
                                onChange={(options) => {
                                    setSelectedUsers(options);
                                    onChange(options.map(option => option.value));
                                }}
                            />

                            {errors.users && (
                                <b className="text-danger d-block mt-1">{errors.users.message}</b>
                            )}
                        </>
                    )}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>Create Group Chat</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGroupChatModal;
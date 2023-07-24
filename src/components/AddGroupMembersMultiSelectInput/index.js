import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Image } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import { Controller } from 'react-hook-form';

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
                <Image src={`${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`} roundedCircle />
            </div>

            <div className={userDescription}>
                <div> {label} </div>
                <div> <b>Email: </b> {email} </div>
            </div>
        </div>
    );
};

function AddGroupMembersMultiSelectInput({ name, control, errors, users = [], customUser }) {
    const timeoutId = useRef(null);
    const controller = useRef({ abort: () => { } });

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

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
                    customUser ? [...users, customUser] : users,
                    (user) => `${user.firstName} ${user.lastName}`,
                    "_id",
                    { avatar: "avatar", email: "email" }
                );

                callback(options);
            });
        }, 500);
    }

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={users}
            render={({ field: { name, onBlur, onChange, value } }) => (
                <>
                    <AsyncSelect
                        name={name}
                        value={value}
                        isMulti={true}
                        onBlur={onBlur}
                        onChange={onChange}
                        cacheOptions={true}
                        defaultOptions={true}
                        placeholder="Add Users"
                        loadOptions={loadUsers}
                        isLoading={loading || error}
                        components={{ Option: CustomOptionComponent }}
                    />

                    {errors[name] && (
                        <b className="text-danger d-block mt-1">{errors[name].message}</b>
                    )}
                </>
            )}
        />
    );
}

export default AddGroupMembersMultiSelectInput;
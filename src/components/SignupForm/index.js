import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import * as yup from 'yup';
import { produce } from "immer";
import { ClipLoader } from "react-spinners";
import { yupResolver } from '@hookform/resolvers/yup';

import { register as registerUser } from '../../store/slices/authSlice';
import styles from "./style.module.scss";

const inpElem = [
    {
        id: 1,
        name: "firstName",
        type: 'text',
        placeholder: "Enter first name",
    },
    {
        id: 2,
        name: "lastName",
        type: 'text',
        placeholder: "Enter last name",
    },
    {
        id: 3,
        name: "username",
        type: 'text',
        placeholder: "Enter Username",
    },
    {
        id: 4,
        name: "email",
        type: 'email',
        placeholder: "Enter email",
    },
    {
        id: 5,
        name: "password",
        type: 'password',
        placeholder: "Enter password",
    },
    {
        id: 6,
        name: "confirmPassword",
        type: 'password',
        placeholder: "Confirm password",
    },
    {
        id: 7,
        name: "avatar",
        type: "file",
        placeholder: "Select a Profile Picture",
    }
];

const schema = yup.object().shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    username: yup.string().required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .max(25, 'Username cannot exceed 16 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain alphanumeric characters and underscores'
    ),
    email: yup.string().required('This field is required').email('Please enter a valid email address'),
    password: yup.string().required('This field is required').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    avatar: yup
        .mixed()
        .test("required", "You need to provide a file", (value) => {
            return value.length > 0 && value[0].size;
        })
        .test("fileType", "Only image files are allowed", (value) => {
            return value.length && ["image/jpeg", "image/png", "image/gif"].includes(value[0].type);
        })
        .test("fileSize", "The file is too large", (value) => {
            return value.length && value[0].size <= 1048576;
        })
});

function SignupForm({ changeTab }) {
    const { signupForm, signupLoader } = styles;
     
    const timeoutId = useRef(null);
    const controller = useRef({ abort: () => {} });
    const [showAlert, setShowAlert] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const { loading, error, signupMessage } = useSelector((state) => state.auth);

    function onSubmit(data) {
        let userData = produce(data, (draft) => {
            draft.avatar = draft.avatar[0];
        })

        const promise = dispatch(registerUser(userData));
        controller.current.abort = promise.abort;

        promise.then(() => {
            setShowAlert(true);
            timeoutId.current = setTimeout(() => changeTab("login"), 3000);
        })
    }

    useEffect(() => () => {
        controller.current.abort();
        clearTimeout(timeoutId.current);
    }, []);

    return (
        <form className={signupForm} onSubmit={handleSubmit(onSubmit)}>
            {error && <Alert variant="danger"> <b> Error: {error.message} </b> </Alert>}

            {(signupMessage && showAlert) && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                    <b> Your Account has been Registered Successfully. Please login to your Account </b>
                </Alert>
            )}

            {inpElem.map(elem => (
                <div key={elem.id} className="mb-3">
                    <input
                        type={elem.type}
                        className="form-control"
                        placeholder={elem.placeholder}
                        {...register(elem.name)}
                    />
                    {errors[elem.name] && <b className="text-danger">{errors[elem.name].message}</b>}
                </div>
            ))}

            <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>

            {loading && <div className={signupLoader}>
                <ClipLoader
                    size={50}
                    loading={true}
                    color="#000000"
                    cssOverride={{ borderWidth: "5px" }}
                />
            </div>}
        </form>
    );
}

export default React.memo(SignupForm);
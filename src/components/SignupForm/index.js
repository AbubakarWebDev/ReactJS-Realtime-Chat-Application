import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as yup from 'yup';
import { produce } from "immer";
import { yupResolver } from '@hookform/resolvers/yup';

import { register as registerUser, authActions } from '../../store/slices/authSlice';
import RequestLoader from './../RequestLoader';

const inpElem = [
    {
        id: 1,
        type: 'text',
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
    },
    {
        id: 2,
        type: 'text',
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter last name",
    },
    {
        id: 3,
        type: 'text',
        name: "username",
        label: "Username",
        placeholder: "Enter Username",
    },
    {
        id: 4,
        name: "email",
        type: 'email',
        label: "Email",
        placeholder: "Enter email",
    },
    {
        id: 5,
        name: "password",
        label: "Password",
        type: 'password',
        placeholder: "Enter password",
    },
    {
        id: 6,
        type: 'password',
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Confirm password",
    },
    {
        id: 7,
        type: "file",
        name: "avatar",
        label: "Profile Photo",
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

function SignupForm() {     
    const timeoutId = useRef(null);
    const controller = useRef({ abort: () => {} });
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const { loading, error, isRegistered } = useSelector((state) => state.auth);

    function onSubmit(data) {
        let userData = produce(data, (draft) => {
            draft.avatar = draft.avatar[0];
        })

        const promise = dispatch(registerUser(userData));
        controller.current.abort = promise.abort;

        promise.unwrap().then(() => {
            setShowAlert(true);
            timeoutId.current = setTimeout(() => navigate('/login'), 3000);
        });
    }

    useEffect(() => {
        dispatch(authActions.setError(null));

        return () => {
            controller.current.abort();
            clearTimeout(timeoutId.current);
        }
    }, []);

    return (
        <form className="position-relative" onSubmit={handleSubmit(onSubmit)}>
            {error && <Alert variant="danger"> <b> Error: {error.message} </b> </Alert>}

            {(isRegistered && showAlert) && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                    <b> Your Account has been Registered Successfully. Please login to your Account </b>
                </Alert>
            )}

            {inpElem.map(elem => (
                <div 
                    key={elem.id} 
                    className={`mb-3 ${elem.type !== "file" ? "form-floating" : ""}`}
                >
                    {(elem.type === "file") && (<label htmlFor={elem.name}> { elem.label } </label>)}

                    <input
                        id={elem.name}
                        type={elem.type}
                        className="form-control form-control-lg"
                        placeholder={elem.placeholder}
                        {...register(elem.name)}
                    />
                    
                    {(elem.type !== "file") && (<label htmlFor={elem.name}> { elem.label } </label>)}

                    {errors[elem.name] && (
                        <b className="text-danger d-block mt-1">{errors[elem.name].message}</b>
                    )}
                </div>
            ))}

            <button 
                type="submit" 
                className="btn btn-lg btn-primary w-100 text-center" 
                disabled={loading}
            >
                Create Account
            </button>

            {loading && <RequestLoader />}
        </form>
    );
}

export default React.memo(SignupForm);
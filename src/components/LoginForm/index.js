import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import RequestLoader from './../RequestLoader';
import { login, authActions } from '../../store/slices/authSlice';

const inpElem = [
    {
        id: 1,
        type: 'text',
        name: "email",
        label: "Email",
        placeholder: "Enter email",
    },
    {
        id: 2,
        name: "password",
        type: 'password',
        label: "Password",
        placeholder: "Enter Password",
    },
];

const schema = yup.object().shape({
    email: yup.string().required('This field is required').email('Please enter a valid email address'),
    password: yup.string().required('This field is required').min(8, 'Password must be at least 8 characters long'),
});

function LoginForm() {
    const navigate = useNavigate();
    const timeoutId = useRef(null);
    const controller = useRef({ abort: () => {} });
    const [showAlert, setShowAlert] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const { loading, error, token } = useSelector((state) => state.auth);

    const onSubmit = (data) => {
        const promise = dispatch(login(data));
        controller.current.abort = promise.abort;

        promise.unwrap().then(() => {
            setShowAlert(true);
            timeoutId.current = setTimeout(() => { navigate('/', { replace: true }) }, 3000);
        });
    };

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

            {(token && showAlert) && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                    <b> Your Account has been LoggedIn Successfully. Redirecting....</b>
                </Alert>
            )}

            {inpElem.map(elem => (
                <div key={elem.id} className="mb-3 form-floating">
                    <input
                        id={elem.name}
                        type={elem.type}
                        className="form-control"
                        placeholder={elem.placeholder}
                        {...register(elem.name)}
                    />

                    <label htmlFor={elem.name}> { elem.label } </label>

                    {errors[elem.name] && (
                        <b className="text-danger d-block mt-1">{errors[elem.name].message}</b>
                    )}
                </div>
            ))}

            <button 
                type="submit" 
                disabled={loading}
                className="btn btn-md btn-primary w-100 text-center" 
            >
                Login Account
            </button>

            <Link 
                disabled={loading}
                to="/forgot-password"
                className="btn btn-md btn-primary w-100 mt-2 text-center" 
            >
                Forgot Password
            </Link>

            {loading && <RequestLoader />}
        </form>
    );
}

export default LoginForm;
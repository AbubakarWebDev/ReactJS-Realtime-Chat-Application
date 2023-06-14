import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from 'react';

import * as yup from 'yup';
import { produce } from "immer";
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from "react-router-dom";

import Loader from './../Loader';
import RequestLoader from './../RequestLoader';
import { resetPassword, authActions } from '../../store/slices/authSlice';
import { checkUserExist, userActions } from '../../store/slices/userSlice';

const inpElem = [
  {
    id: 1,
    name: "password",
    label: "Password",
    type: 'password',
    placeholder: "Enter Password",
  },
  {
    id: 2,
    type: 'password',
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
  },
];

const schema = yup.object().shape({
  password: yup.string().required('This field is required').min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

function ResetPasswordForm() {
  const passResetTimeoutId = useRef(null);
  const userTimeoutId = useRef(null);
  const controller = useRef({ abort: () => { } });

  const navigate = useNavigate();
  const { userId, token } = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { loading, error, isPasswordReset } = useSelector((state) => state.auth);
  const { loading: userLoading, error: userError, isUserExist } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    const newData = produce(data, (draft) => {
      draft.id = userId
      draft.token = token
    });

    const promise = dispatch(resetPassword(data));
    controller.current.abort = promise.abort;

    promise.unwrap().then(() => {
      setShowAlert(true);
    })
    .catch(() => {
      passResetTimeoutId.current = setTimeout(() => navigate('/login'), 3000);
    });
  };

  useEffect(() => {
    dispatch(authActions.setError(null));
    dispatch(userActions.setError(null));

    dispatch(checkUserExist(userId)).unwrap().catch((err) => {
      userTimeoutId.current = setTimeout(() => navigate('/login'), 3000);
    });

    return () => {
      clearTimeout(userTimeoutId.current);
      clearTimeout(passResetTimeoutId.current);
      controller.current.abort();
    }
  }, []);

  return (
    <form className="position-relative" onSubmit={handleSubmit(onSubmit)}>
      {(error || userError) && <Alert variant="danger"> <b> Error: Your Password Reset Link is Invalid/Expired! Redirecting.... </b> </Alert>}

      {(isPasswordReset && showAlert) && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          <b> Password Reset Successfully!. Redirecting to you for login your account... </b>
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

          <label htmlFor={elem.name}> {elem.label} </label>

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
        Reset Password
      </button>

      {loading && <RequestLoader />}
      {userLoading && <Loader />}
    </form>
  );
}

export default ResetPasswordForm;
import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import RequestLoader from './../RequestLoader';
import { forgotPassword, authActions } from '../../store/slices/authSlice';

const inpElem = [
  {
    id: 1,
    type: 'text',
    name: "email",
    label: "Email",
    placeholder: "Enter email",
  },
];

const schema = yup.object().shape({
  email: yup.string().required('This field is required').email('Please enter a valid email address'),
});

function ForgotPasswordForm() {
  const controller = useRef({ abort: () => { } });
  const [showAlert, setShowAlert] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { loading, error, isEmailSent } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    const promise = dispatch(forgotPassword(data));
    controller.current.abort = promise.abort;

    promise.unwrap().then(() => {
      setShowAlert(true);
    });
  };

  useEffect(() => {
    dispatch(authActions.setError(null));
    return () => controller.current.abort();
  }, []);

  return (
    <form className="position-relative" onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert variant="danger"> <b> Error: {error.message} </b> </Alert>}

      {(isEmailSent && showAlert) && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          <b> Please check your email for password reset! </b>
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
        Forgot Password
      </button>

      {loading && <RequestLoader />}
    </form>
  );
}

export default ForgotPasswordForm;
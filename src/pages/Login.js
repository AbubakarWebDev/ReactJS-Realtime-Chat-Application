import React from 'react';
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import FormLayout from '../layouts/FormLayout';

const options = {
  title: "Login Your Account",
  footer: (
    <>
      <span>Don't Have An Account?</span>
      <Link to="/signup"> Register Here </Link>
    </>
  ),
}

function Login() {
  return <LoginForm />
}

export default FormLayout(Login, options);
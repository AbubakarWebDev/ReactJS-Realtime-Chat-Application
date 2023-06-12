import React from 'react';
import { Link } from "react-router-dom";

import SignupForm from "../components/SignupForm";
import FormLayout from '../layouts/FormLayout';

const options = {
  title: "Login Your Account",
  footer: (
    <>
      <span>Already Have An Account?</span>
      <Link to="/login"> Login Here </Link>
    </>
  ),
}

function Signup() {
  return <SignupForm />
}

export default FormLayout(Signup, options);
import React from 'react';

import ForgotPasswordForm from "../components/ForgotPasswordForm";
import FormLayout from '../layouts/FormLayout';

const options = {
  title: "Find Your Account",
}

function ForgotPassword() {
  return <ForgotPasswordForm />
}

export default FormLayout(ForgotPassword, options);
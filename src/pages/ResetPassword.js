import React from 'react';

import ResetPasswordForm from "../components/ResetPasswordForm";
import FormLayout from '../layouts/FormLayout';

const options = {
  title: "Reset Your Password",
}

function ResetPassword() {
  return <ResetPasswordForm />
}

export default FormLayout(ResetPassword, options);
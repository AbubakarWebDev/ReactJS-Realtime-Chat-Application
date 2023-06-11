import React from 'react';
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className='form-container'>
        <div className="form">
            <h3 className="mb-3 mt-1">Login Your Account</h3>
            
            <LoginForm />

            <p className="mt-3 mb-1">
                <span>Don't Have An Account?</span>
                <Link to="/signup"> Register Here </Link>
            </p>
        </div>
    </div>
  );
}

export default Login
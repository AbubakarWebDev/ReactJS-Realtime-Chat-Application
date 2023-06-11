import React from 'react'
import { Link } from "react-router-dom";

import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <div className='form-container'>
        <div className="form">
            <h3 className="mb-3 mt-1">Register Your Account</h3>
            
            <SignupForm />

            <p className="mt-3 mb-1">
                <span>Already Have An Account?</span>
                <Link to="/login"> Login Here </Link>
            </p>
        </div>
    </div>
  )
}

export default Signup;
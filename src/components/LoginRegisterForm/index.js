import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

import styles from "./style.module.scss";
const { loginRegister, title } = styles;

function LoginRegisterForm() {
    return (
        <div className={loginRegister}>
            <h3 className={title}>Chat Application</h3>
            
            <Tabs defaultActiveKey="login">
                <Tab eventKey="login" title="login">
                    <LoginForm />
                </Tab>
                <Tab eventKey="register" title="Register">
                    <SignupForm />
                </Tab>
            </Tabs>
        </div>
    );
}

export default LoginRegisterForm;
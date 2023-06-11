import React, { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

import styles from "./style.module.scss";
const { loginRegister } = styles;

function LoginRegisterForm() {
    const [ activeKey, setActiveKey ] = useState("login");

    return (
        <div className={loginRegister}>            
            <Tabs 
                unmountOnExit={true} 
                activeKey={activeKey} 
                onSelect={(key) => setActiveKey(key)}
            >
                <Tab eventKey="login" title="login">
                    <LoginForm />
                </Tab>
                <Tab eventKey="register" title="Register">
                    <SignupForm changeTab={setActiveKey} />
                </Tab>
            </Tabs>
        </div>
    );
}

export default LoginRegisterForm;
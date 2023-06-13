import React, { useEffect } from 'react';
import { RouterProvider, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import router from './routes';
import Loader from './components/Loader';
import { authActions } from './store/slices/authSlice';
import { getLoggedInUser } from './store/slices/userSlice';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleStorageChange(event) {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(getLoggedInUser(token))
                .unwrap()
                .catch(() => {
                    dispatch(authActions.logout());
                    navigate('/login', { replace: true });
                });
        }
        else {
            dispatch(authActions.logout());
            navigate('/login', { replace: true });
        }
    };

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, []);

    return (
        <RouterProvider
            router={router}
            fallbackElement={<Loader />}
        />
    );
}

export default App;
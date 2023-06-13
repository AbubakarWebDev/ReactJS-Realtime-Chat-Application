import React, { useState, useEffect } from 'react';

function useAuth({ getCurrentUserPromise, tokenKey }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserAuthentication = () => {
            getCurrentUserPromise
                .then(() => {
                    setIsAuthenticated(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                });
        };

        checkUserAuthentication();

        const handleStorageChange = (event) => {
            if (event.key === tokenKey) {
                checkUserAuthentication();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { isAuthenticated, isLoading };
};

export default useAuth;
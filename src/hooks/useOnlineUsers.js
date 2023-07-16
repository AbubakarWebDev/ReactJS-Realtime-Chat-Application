import { useEffect, useState } from 'react';
import socket, { emit } from "../socket";

const useOnlineStatus = (user) => {
    const [onlineUsers, setOnlineUsers] = useState({});

    useEffect(() => {
        socket.connect();

        if (user) {
            emit(socket, "setup", user._id);
        }

        const getOnlineUsers = (users) => {
            setOnlineUsers((prevState) => {
                if (JSON.stringify(users) === JSON.stringify(prevState)) {
                    return prevState;
                }
                else {
                    return users;
                }
            });
        }

        socket.on("onlineUsers", getOnlineUsers);

        return () => {
            socket.off("onlineUsers", getOnlineUsers);
        }
    }, [user]);

    return onlineUsers;
};

export default useOnlineStatus;
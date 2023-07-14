import { useEffect, useState } from 'react';
import socket, { emit } from "../socket";

const useOnlineStatus = (user) => {
    const [onlineUsers, setOnlineUsers] = useState({});

    useEffect(() => {
        socket.connect();

        if (user) {
            emit(socket, "setup", user._id);
            // socket.emit("setup", user._id);
        }

        const getOnlineUsers = (users) => {
            console.log(users);
            setOnlineUsers(users);
        }

        socket.on("onlineUsers", getOnlineUsers);

        return () => {
            // socket.off("onlineUsers", getOnlineUsers);
            // console.log("off", "onlineUsers");
        }
    }, [user]);

    return onlineUsers;
};

export default useOnlineStatus;
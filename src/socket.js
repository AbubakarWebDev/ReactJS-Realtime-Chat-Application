import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_BASE_URL);

function emit(socket, event, arg) {
    socket.timeout(2000).emit(event, arg, (err) => {
        if (err) {
            console.log(err);

            // no ack from the server, let's retry
            emit(socket, event, arg);
        }
    });
}

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

export {
    emit
};

export default socket;
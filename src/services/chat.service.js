import Api from "./api.service";

const getAllChats = (signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal
    };

    return Api.get("/chats", options);
};

const getorCreateChats = (payload, signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal
    };

    return Api.post("/chats", payload, options);
}

export {
    getAllChats,
    getorCreateChats
};
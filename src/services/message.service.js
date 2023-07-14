import Api from "./api.service";

const getAllMessages = (payload, signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal,
    };

    return Api.get(`/messages?chatId=${payload.chatId}`, options);
}

const sendMessage = (payload, signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal,
    };

    return Api.post("/messages", payload, options);
}

const updateReadBy = (payload, signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal,
    };

    return Api.put("/messages/readby", payload, options);
}

export {
    getAllMessages,
    sendMessage,
    updateReadBy
};
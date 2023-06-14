import Api from "./api.service";

const currentUser = (token, signal) => {
    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal
    };

    return Api.get("/users/loggedin", options);
};

const userExist = (id, signal) => {
    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        signal: controller.signal
    };

    return Api.get(`/users/${id}`, options);
};

export {
    currentUser,
    userExist
};
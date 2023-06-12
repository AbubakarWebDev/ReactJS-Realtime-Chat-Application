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

    return Api.get("/auth/loggedin-user", options);
};

export {
    currentUser
};
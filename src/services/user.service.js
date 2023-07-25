import Api from "./api.service";
import { convertToMultipartFormData } from "../utils";

const currentUser = (signal) => {
    const token = localStorage.getItem("token");

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

const getAllUsers = (search, signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal
    };

    return Api.get(`/users?search=${search}`, options);
}

const updateUserAvatar = (payload, signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal
    };

    const formData = convertToMultipartFormData(payload);

    return Api.put("/users/avatar", formData, options);
}

const updateUserProfile = (payload, signal) => {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal
    };

    return Api.put("/users", payload, options);
}

export {
    userExist,
    currentUser,
    getAllUsers,
    updateUserAvatar,
    updateUserProfile,
};
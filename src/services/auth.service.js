import Api from "./api.service";
import { convertToMultipartFormData } from "../utils";

const register = (userData, signal) => {
    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        signal: controller.signal
    };

    const formData = convertToMultipartFormData(userData);

    return Api.post("/auth/register", formData, options);
};

export {
    register
};
import Api from "./api.service";

const register = (formData) => {
    return Api.post("/auth/register", formData);
};

const AuthService = {
    register,
}

export default AuthService;
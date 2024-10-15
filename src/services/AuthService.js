import axiosInstance from "utils/axiosInstance";

const authAPI = `${import.meta.env.VITE_APP_API_URL}/api/auth`;

const register = (user) => axiosInstance.post(`${authAPI}/register`, user);

const forgotPassword = (email) => axiosInstance.post(`${authAPI}/forgot-password/${email}`);

const resetPassword = (resetPasswordRequest) => axiosInstance.post(`${authAPI}/reset-password`, resetPasswordRequest);

const getResetTokenInfo = (token) => axiosInstance.get(`${authAPI}/get-token-info/${token}`);

export {
    register,
    forgotPassword,
    resetPassword,
    getResetTokenInfo
};
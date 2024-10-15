import axiosInstance from 'utils/axiosInstance';

const userAPI = `${import.meta.env.VITE_APP_API_URL}/api/user`;

const saveUser = (user) => axiosInstance.post(`${userAPI}/save`, user);

export {
    saveUser
};

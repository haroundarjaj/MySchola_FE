import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
});

axiosInstance.interceptors.request.use((config) => {
    let token = null;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else token = sessionStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from 'utils/axiosInstance';

const initialState = {
    isAuthenticated: false,
    isRemember: false,
    isLoading: true,
    user: null,
    token: null,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, isRemember }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`, { email, password });
            if (isRemember) {
                localStorage.setItem('token', response.data.token);
            }
            else sessionStorage.setItem('token', response.data.token);
            return { ...response.data, isRemember };
        } catch (error) {
            console.log(error)
            if (error.response?.data?.code) return rejectWithValue(error.response?.data?.code);
            return rejectWithValue(error.code)
        }
    });

export const checkAuthentication = createAsyncThunk(
    'auth/checkAuthentication ',
    async (arg, { rejectWithValue }) => {
        try {
            let token = null;
            let isRemember = false;
            if (localStorage.getItem("token") !== null) {
                token = localStorage.getItem("token");
                isRemember = true;
            } else token = sessionStorage.getItem("token");
            if (token) {
                const userInfo = jwtDecode(token);
                const response = await axiosInstance.get(`/user/get-by-id/${userInfo.id}`);
                if (response.data?.active && response.data?.approved) {
                    return { user: response.data, token, isRemember };
                } else if (!response.data?.user?.approved) {
                    return rejectWithValue('user_not_approved');
                }
                return rejectWithValue('user_disabled');
            }
            else return null;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.code);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            console.log(state)
            if (state.isRemember) {
                localStorage.removeItem('token');
            } else sessionStorage.removeItem('token');
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.isRemember = action.payload.isRemember;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            .addCase(checkAuthentication.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isAuthenticated = true;
                    state.isRemember = action.payload.isRemember;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.error = null;
                }
                state.isLoading = false;
            })
            .addCase(checkAuthentication.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
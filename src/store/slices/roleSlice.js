import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
    roles: [],
    fetcehd: false,
    error: null
}

export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/role/all`);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || "fetching failed, try again")
        }
    }
)

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setRoles: (state, action) => {
            state.role = action.payload
        },
        setFetcehd: (state, action) => {
            state.fetcehd = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload;
                state.fetcehd = true;
                state.error = null
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.fetcehd = false;
                state.error = action.payload;
            })
    }
})

export const { setRoles, setFetcehd } = roleSlice.actions;
export default roleSlice.reducer;
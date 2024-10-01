import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    permissions: [],
    fetched: false,
    error: null
}

export const fetchPermissions = createAsyncThunk(
    'permission/fetchPermissions',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/permission/all`);
            return response.data;
        }
        catch (error) {
            return rejectWithValue("Fetch error")
        }
    }
)

const permissionSlice = createSlice({
    name: "permission",
    initialState,
    reducers: {
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        setFetcehd: (state, action) => {
            state.fetched = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.permissions = action.payload;
                state.fetched = true;
                state.error = null;
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.error = action.payload;
            })

    }
})

export const { setFetcehd, setPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
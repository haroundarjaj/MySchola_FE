import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const initialState = {
    isOpen: [],
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
};

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        menuOpen: (state, action) => {
            state.isOpen = [action.payload];
        },
        setMenu: (state, action) => {
            state.opened = action.payload;
        },
        setFontFamilyState: (state, action) => {
            state.fontFamily = action.payload;
        },
        setBorderRadiusState: (state, action) => {
            state.borderRadius = action.payload;
        }
    }
});

export const { menuOpen, setMenu, setFontFamilyState, setBorderRadiusState } = customizationSlice.actions;

export default customizationSlice.reducer;
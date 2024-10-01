import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const showNotification = (msg, sev = 'success') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={3000}
                TransitionComponent={Slide}
            >
                <MuiAlert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {message}
                </MuiAlert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};
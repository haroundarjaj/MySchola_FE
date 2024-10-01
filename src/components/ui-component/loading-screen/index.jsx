import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import logo from 'assets/images/MyScholaLogo.png';
import logoTitle from 'assets/images/MyScholaTitle.png';
import dotsLoading from 'assets/images/loading/dots-loading.svg';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <Box className="loading-screen" >
            <div className="logo-container">
                <img
                    src={logo}
                    alt="MySchola"
                    className="logo"
                />
            </div>
            <div>
                <img
                    src={logoTitle}
                    alt="MySchola"
                    className="logo-title"
                />
            </div>
            {/* <Typography variant="h6" sx={{ marginTop: 2 }}>
                Loading...
            </Typography> */}
            {/* <CircularProgress sx={{ marginTop: 2 }} /> */}
            <div>
                <img
                    src={dotsLoading}
                    alt="loading"
                    className="loading-indicator"
                />
            </div>
        </Box>
    );
};

export default LoadingScreen;
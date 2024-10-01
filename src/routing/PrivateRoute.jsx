import { jwtDecode } from "jwt-decode";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNotification } from "utils/NotificationProvider";

const PrivateRoute = ({ element, requiredRole }) => {
    const { isAuthenticated, user, token } = useSelector((state) => state.auth);
    const { showNotification } = useNotification();
    const tAuth = useTranslation("authentication").t;

    const isTokenExpired = () => {
        try {
            const { exp } = jwtDecode(token);
            if (exp) {
                const currentTime = Date.now() / 1000;
                return exp < currentTime;
            }
        } catch (error) {
            return true;
        }
        return false;
    };

    if (!isAuthenticated || !user.roles) {
        return <Navigate to="/login" />;
    }

    if (isTokenExpired()) {
        setTimeout(() => {
            showNotification(tAuth('session_expired'), "warning")
        }, 300)
        return <Navigate to="/login" />;
    }



    const roles = user.roles.map(role => role.code);
    if (requiredRole && !roles.includes(requiredRole)) {
        return <Navigate to="/403" />;
    }

    return element;
};

export default PrivateRoute;
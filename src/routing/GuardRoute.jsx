import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuardRoute = ({ element }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return isAuthenticated ? <Navigate to="/dashboard" /> : element;
};

export default GuardRoute;
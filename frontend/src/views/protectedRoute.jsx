import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const isAuthenticated = JSON.parse(sessionStorage.getItem("authToken")); // Puedes usar localStorage también

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
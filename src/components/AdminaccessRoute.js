import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function AdminaccessRoute({ children }) {
    const { user } = UserAuth();

    if (user.email!=='admin@admin.com')
        return <Navigate to='/' />
    else
    return children;
}

export default AdminaccessRoute;

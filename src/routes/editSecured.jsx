import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const EditSecured = ({ children }) => {
    const [cookies] = useCookies(['isLoggedinEditor']);

    if (!cookies.isLoggedinEditor) {
        return <Navigate to="/" replace/>;
    }
    return children
};

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ApiContext } from '../context/ApiContext'
import { useCookies } from 'react-cookie';

export const Secured = ({ children }) => {
    const [cookies] = useCookies(['isLoggedinASC', 'AscID']);
    const { user } = useContext(ApiContext)
        if (!user.level === 2 || !cookies.isLoggedinASC) {
        return <Navigate to="/" replace />;
    }
    return children
};

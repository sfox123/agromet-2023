import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ApiContext } from '../context/ApiContext'
import { useCookies } from 'react-cookie';

const Protected = ({children}) => {
  const [cookies] = useCookies(['isLoggedinAdmin']);
  const { user } = useContext(ApiContext)
  const { level } = user;
    if (!level === 1 || !cookies.isLoggedinAdmin) {
          return <Navigate to="/" replace />;
    }
    return children
};

export default Protected
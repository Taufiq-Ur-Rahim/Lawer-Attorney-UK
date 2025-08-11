import React, { useContext } from 'react'
import { Navigate } from "react-router-dom"
import { Store } from '../Utils/Store'

function AttorneyProtected({children}) {
    const {state}=useContext(Store)
    const {UserInfo}=state

    // Get user from localStorage as fallback
    const getCurrentUser = () => {
        try {
            const userFromStorage = localStorage.getItem("UserInfo");
            return userFromStorage ? JSON.parse(userFromStorage) : null;
        } catch (error) {
            return null;
        }
    };

    const currentUser = UserInfo || getCurrentUser();

    // Allow both regular users and lawyers (any logged in user)
    return currentUser ? children : <Navigate to='/login'/>
}

export default AttorneyProtected
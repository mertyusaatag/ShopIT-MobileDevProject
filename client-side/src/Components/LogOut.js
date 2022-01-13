import React from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'


const LogOut = () => {

    useEffect(() => {
        localStorage.clear()
        const user = {
            name: "GUEST",
            accessLevel: 0
        }
        localStorage.setItem("user", JSON.stringify(user))
        const cart = {
            products: [],
            total: 0
        }
        localStorage.setItem("cart",JSON.stringify(cart))
    }, [])

    return(
        <div className="LogOut">
            <Navigate to="/homepage"/>
        </div>
    );
}

export default LogOut;
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const user = useSelector((state) => state.auth.userInfo)

    return (
      ['admin']?.includes(user?.role)
        ? <Navigate to="/" replace />
        : <Outlet />
    )
}

export default AuthGuard
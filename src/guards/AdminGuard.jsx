import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminGuard = () => {
    const user = useSelector((state) => state.auth.userInfo)

    return (
        ['admin']?.includes?.(user?.role) ? <Outlet /> : <Navigate to='/login' replace />
    )
}

export default AdminGuard
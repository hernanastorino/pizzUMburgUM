/*import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    // ===== TEMPORAL PARA DESARROLLO - BORRAR DESPUÉS =====
    return <Outlet />;
    // =====================================================
    
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        if (role === 'adminRole') return <Navigate to="/backoffice" replace />;
        if (role === 'clientRole') return <Navigate to="/menu" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;*/

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        if (role === 'adminRole') return <Navigate to="/backoffice" replace />;
        if (role === 'clientRole') return <Navigate to="/menu" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
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

// We accept a property called 'allowedRoles'
const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Get the stored role

    // 1. Check if logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. Check if the user's role is allowed for this specific route
    // If allowedRoles is provided, and the user's role isn't in the list...
    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect them to their appropriate home base
        if (role === 'adminRole') return <Navigate to="/backoffice" replace />;
        if (role === 'clientRole') return <Navigate to="/menu" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
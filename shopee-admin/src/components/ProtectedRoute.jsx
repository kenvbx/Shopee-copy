// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('admin_token');

    if (!token) {
        // Nếu không có token, chuyển hướng về trang login
        return <Navigate to="/login" />;
    }

    // Nếu có token, hiển thị component con (ví dụ: trang Dashboard)
    return <Outlet />;
};

export default ProtectedRoute;
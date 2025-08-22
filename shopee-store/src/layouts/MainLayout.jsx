// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AuthModal from '../components/auth/AuthModal';
import QuickViewModal from '../components/common/QuickViewModal';

function MainLayout() {
    return (
        <div className="page-wrapper">
            <h1 className="d-none">Riode - Responsive eCommerce HTML Template</h1>
            <Header />

            <Outlet />

            <Footer />

            <AuthModal />
            <QuickViewModal />
        </div>
    );
}

export default MainLayout;

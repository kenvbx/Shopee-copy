// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import BrandPage from './pages/BrandPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import AttributePage from './pages/AttributePage';
import AttributeValuesPage from './pages/AttributeValuesPage';
import TagPage from './pages/TagPage';
import UserListPage from './pages/UserListPage';
import UserFormPage from './pages/UserFormPage';
import ProfilePage from './pages/ProfilePage';
import SellerListPage from './pages/SellerListPage';
import SellerFormPage from './pages/SellerFormPage';
import OptionsPage from './pages/OptionsPage';
import BannerListPage from './pages/BannerListPage';
import BannerFormPage from './pages/BannerFormPage';
import SubscriberListPage from './pages/SubscriberListPage';

function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
            <Routes>
                {/* Route công khai cho trang đăng nhập */}
                <Route path="/login" element={<LoginPage />} />

                {/* 2. Nhóm các route admin vào bên trong ProtectedRoute và AdminLayout */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/product-categories" element={<ProductCategoryPage />} />
                        <Route path="/products" element={<ProductListPage />} />
                        <Route path="/products/add" element={<ProductFormPage />} />
                        <Route path="/products/edit/:id" element={<ProductFormPage />} />
                        <Route path="/brands" element={<BrandPage />} />
                        <Route path="/attributes" element={<AttributePage />} />
                        <Route path="/attributes/:attributeId/values" element={<AttributeValuesPage />} />
                        <Route path="/tags" element={<TagPage />} />
                        <Route path="/users" element={<UserListPage />} />
                        <Route path="/users/add" element={<UserFormPage />} />
                        <Route path="/users/edit/:id" element={<UserFormPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/sellers" element={<SellerListPage />} />
                        <Route path="/sellers/add" element={<SellerFormPage />} />
                        <Route path="/sellers/edit/:id" element={<SellerFormPage />} />
                        <Route path="/options" element={<OptionsPage />} />
                        <Route path="/banners" element={<BannerListPage />} />
                        <Route path="/banners/add" element={<BannerFormPage />} />
                        <Route path="/banners/edit/:id" element={<BannerFormPage />} />
                        <Route path="/subscribers" element={<SubscriberListPage />} />
                    </Route>
                </Route>

                {/* Route mặc định: nếu vào trang không xác định thì chuyển về dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </>
    );
}

export default App;

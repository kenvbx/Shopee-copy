// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OptionsProvider } from './context/OptionsContext';
import { WishlistProvider } from './context/WishlistContext';
// import "./i18n";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <OptionsProvider>
                        <WishlistProvider>
                            <App />
                        </WishlistProvider>
                    </OptionsProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

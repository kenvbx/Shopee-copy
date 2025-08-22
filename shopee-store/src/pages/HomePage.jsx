// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import HomeSlider from '../components/home/HomeSlider';
import DealsSection from '../components/home/DealsSection';
import ProductWrapper_1 from '../components/home/ProductWrapper_1';
import ProductWrapper_2 from '../components/home/ProductWrapper_2';
import ProductWrapper_3 from '../components/home/ProductWrapper_3';
import BrandsWrapper from '../components/home/BrandsWrapper';
import ProductTab from '../components/home/ProductTab';
import RecentView from '../components/home/RecentView';

function HomePage() {
    return (
        <main className="main">
            <div className="page-content">
                <HomeSlider />
                <DealsSection />

                <section className="grey-section pt-10 pb-10">
                    <div className="container mt-6">
                        <ProductWrapper_1 />
                        <ProductWrapper_2 />
                        <ProductWrapper_3 />
                        <BrandsWrapper />
                        <ProductTab />
                        <RecentView />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default HomePage;

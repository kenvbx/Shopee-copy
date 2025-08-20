// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import HomeSlider from '../components/home/HomeSlider';
import DealsSection from '../components/home/DealsSection';
import TestimonialSection from '../components/home/TestimonialSection';
import BlogSection from '../components/home/BlogSection';
import NewsletterSection from '../components/home/NewsletterSection';
import ProductWrapper_1 from '../components/home/ProductWrapper_1';
import ProductWrapper_2 from '../components/home/ProductWrapper_2';
import ProductWrapper_3 from '../components/home/ProductWrapper_3';
import BrandsWrapper from '../components/home/BrandsWrapper';
import ProductTag from '../components/home/ProductTag';
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
                        <ProductTag />
                        <RecentView />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default HomePage;

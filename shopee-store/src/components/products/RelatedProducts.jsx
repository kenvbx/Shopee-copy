// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import api from '../../api/axiosInstance';
import ProductCard from '../common/ProductCard'; // Tái sử dụng component ProductCard

const RelatedProducts = ({ productId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (productId) {
            const fetchRelatedProducts = async () => {
                try {
                    const response = await api.get(`/api/public/products/${productId}/related?limit=8`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Lỗi tải sản phẩm liên quan:', error);
                }
            };
            fetchRelatedProducts();
        }
    }, [productId]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 2 } },
        ],
    };

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="pt-2 mt-10">
            <h2 className="title justify-content-center ls-normal">Sản phẩm liên quan</h2>
            <Slider {...settings} className="">
                {products.map((product) => (
                    <div key={product.id} className="p-2">
                        <ProductCard product={product} />
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default RelatedProducts;

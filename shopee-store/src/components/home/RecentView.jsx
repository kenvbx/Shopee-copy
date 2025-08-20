// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import api from '../../api/axiosInstance';

const RecentView = () => {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('recentProducts');
        if (storedProducts) {
            try {
                setRecentProducts(JSON.parse(storedProducts));
            } catch (e) {
                setRecentProducts([]);
            }
        } else {
            setRecentProducts([]);
        }
    }, []);

    return (
        <>
            <h2 className="title ls-normal">Your Recently Viewed Products</h2>
            {recentProducts.length > 0 ? (
                <div
                    className="recent-view-slider owl-carousel owl-theme row cols-xl-8 cols-lg-6 cols-md-4 cols-sm-3 cols-2 mb-8"
                    data-animation-options="{'name': 'fadeIn'}"
                    data-owl-options="{
                          'nav': false,
                          'dots': true,
                          'margin': 20,
                          'responsive': {
                              '0': {
                                  'items': 2
                              },
                              '576': {
                                  'items': 3
                              },
                              '768': {
                                  'items': 4
                              },
                              '992': {
                                  'items': 6
                              },
                              '1200': {
                                  'items': 8
                              }
                          }
                      }"
                >
                    {recentProducts.map((product, index) => (
                        <Link key={index} to={`/product/${product.slug || product.id}`}>
                            <figure className="product-border">
                                <img src={product.image || 'placeholder.jpg'} alt={product.name} width={153} height={172} />
                            </figure>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>Chưa có sản phẩm nào.</p>
            )}
        </>
    );
};

export default RecentView;

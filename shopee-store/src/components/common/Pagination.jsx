// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination || pagination.totalPages <= 1) {
        return null; // Không hiển thị nếu chỉ có 1 trang
    }

    const { currentPage, totalPages } = pagination;

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
                    <a
                        className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(i);
                        }}
                    >
                        {String(i).padStart(2, '0')}
                    </a>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <ul className="pagination flex-center flex-wrap gap-16 mt-40">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a
                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(currentPage - 1);
                    }}
                >
                    <i className="ph-bold ph-arrow-left" />
                </a>
            </li>
            {renderPageNumbers()}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a
                    className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageClick(currentPage + 1);
                    }}
                >
                    <i className="ph-bold ph-arrow-right" />
                </a>
            </li>
        </ul>
    );
};

export default Pagination;

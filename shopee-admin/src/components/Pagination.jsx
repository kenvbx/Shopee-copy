// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  // Nếu không có dữ liệu phân trang hoặc chỉ có 1 trang thì không hiển thị
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { currentPage, totalPages } = pagination;

  // Hàm xử lý khi nhấn vào một trang, thêm e.preventDefault() để không tải lại trang
  const handlePageClick = (e, page) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Tạo một mảng các số trang để render
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="float-end mt-0" aria-label="Page navigation">
      <ul className="pagination">
        
        {/* Nút Previous */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => handlePageClick(e, currentPage - 1)}>
            Previous
          </a>
        </li>

        {/* Các nút số trang */}
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a className="page-link" href="#" onClick={(e) => handlePageClick(e, number)}>
              {number}
            </a>
          </li>
        ))}
        
        {/* Nút Next */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => handlePageClick(e, currentPage + 1)}>
            Next
          </a>
        </li>
        
      </ul>
    </nav>
  );
};

export default Pagination;
// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import axios from 'axios';
import { toast } from 'react-toastify';

// Lấy base URL từ biến môi trường
const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
});

// --- Request Interceptor ---
// Trạm kiểm soát cho mọi request GỬI ĐI
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            // Gắn token vào header của mọi request
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Response Interceptor ---
// Trạm kiểm soát cho mọi response NHẬN VỀ
api.interceptors.response.use(
    (response) => {
        // Nếu response thành công thì trả về
        return response;
    },
    (error) => {
        // Chỉ xử lý lỗi 401 (Unauthorized) - thường là do token không hợp lệ hoặc hết hạn
        if (error.response && error.response.status === 401) {
            // 1. Xóa token cũ
            localStorage.removeItem('admin_token');

            // 2. Thông báo cho người dùng
            toast.warn('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');

            // 3. Chuyển hướng về trang đăng nhập
            // Dùng window.location.href để đảm bảo reload lại toàn bộ trạng thái ứng dụng
            // Thêm một độ trễ nhỏ để người dùng kịp đọc thông báo
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        }

        // Trả về lỗi để các hàm .catch() ở component vẫn có thể xử lý các lỗi khác
        return Promise.reject(error);
    }
);

export default api;

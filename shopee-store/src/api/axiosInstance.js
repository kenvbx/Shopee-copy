// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import axios from "axios";

// Lấy base URL từ biến môi trường của dự án shopee-web
const API_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor cho shopee-web (nếu cần xử lý token người dùng sau này)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_token"); // Dùng token của người dùng
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý lỗi (nếu cần)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Logic xử lý khi token người dùng hết hạn có thể thêm vào đây
    return Promise.reject(error);
  }
);

export default api;

// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
// file: /src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi) // Tải file dịch từ server/public folder
    .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
    .use(initReactI18next) // Kết nối với React
    .init({
        supportedLngs: ['en', 'vi'],
        fallbackLng: 'vi', // Ngôn ngữ mặc định nếu không phát hiện được
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie', 'localStorage'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;
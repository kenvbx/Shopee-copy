// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => handleLanguageChange('vi')} disabled={i18n.language === 'vi'}>
                Tiếng Việt
            </button>
            <button onClick={() => handleLanguageChange('en')} disabled={i18n.language === 'en'}>
                English
            </button>
        </div>
    );
};

export default LanguageSwitcher;
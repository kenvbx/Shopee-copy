// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

import LayoutOptionsTab from '../components/options/LayoutOptionsTab';
import GeneralOptionsTab from '../components/options/GeneralOptionsTab';
import HeaderOptionsTab from '../components/options/HeaderOptionsTab';
import MenuOptionsTab from '../components/options/MenuOptionsTab';

const OptionsPage = () => {
    // State để lưu tất cả các tùy chọn
    const [options, setOptions] = useState({});
    // State để quản lý tab đang hoạt động
    const [activeTab, setActiveTab] = useState('layout');

    // Tải dữ liệu các tùy chọn khi trang được mở
    useEffect(() => {
        api.get('/api/options')
            .then((res) => setOptions(res.data || {}))
            .catch(() => toast.error('Không thể tải cài đặt.'));
    }, []);

    const handleChange = (e) => {
        setOptions({ ...options, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/api/options', options);
            toast.success('Đã lưu các thay đổi!');
        } catch (error) {
            toast.error('Lưu thất bại.');
        }
    };

    const tabs = [
        { key: 'general', label: 'Cài đặt chung' },
        { key: 'layout', label: 'Layout, Color & Scheme' },
        { key: 'header', label: 'Header Option' },
        { key: 'menu', label: 'Quản lý Menu' },
        { key: 'footer', label: 'Footer Option' },
        // ... Thêm các tab khác vào đây
    ];

    return (
        <div className="row">
            <div className="col-lg-12 mx-auto">
                <form onSubmit={handleSubmit} className="card">
                    <div className="card-header py-3 bg-transparent">
                        <div className="d-sm-flex align-items-center">
                            <h5 className="mb-2 mb-sm-0">Tùy chỉnh giao diện</h5>
                            <div className="ms-auto">
                                <button type="submit" className="btn btn-primary">
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12 col-lg-3">
                                <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                                    {tabs.map((tab) => (
                                        <button key={tab.key} className={`nav-link text-start ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)} type="button">
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 col-lg-9">
                                <div className="tab-content">
                                    {activeTab === 'general' && <GeneralOptionsTab options={options} handleChange={setOptions} />}
                                    {activeTab === 'layout' && <LayoutOptionsTab options={options} setOptions={handleChange} />}
                                    {activeTab === 'header' && <HeaderOptionsTab options={options} setOptions={setOptions} />}
                                    {activeTab === 'menu' && <MenuOptionsTab options={options} setOptions={setOptions} />}
                                    {activeTab === 'footer' && <p>Nội dung cho Footer Option...</p>}
                                    {/* ... Thêm các component con khác ở đây */}
                                </div>
                            </div>
                        </div>
                        {/*end row*/}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OptionsPage;

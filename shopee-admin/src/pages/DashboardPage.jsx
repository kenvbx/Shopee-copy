// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';

function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get('http://localhost:8080/api/stats/summary', {
            headers: { Authorization: `Bearer ${token}` },
            });
            setStats(response.data);
        } catch (error) {
            console.error("Không thể tải dữ liệu dashboard", error);
        } finally {
            setLoading(false);
        }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4">
                <StatCard title="Tổng Số Người Dùng" value={stats?.users?.total || 0} icon={<i className="bi bi-basket2-fill" />} color={`bg-gradient-purple`} />
                <StatCard title="Tổng Số Sản Phẩm" value={stats?.products?.total || 0} icon={<i className="bi bi-currency-exchange" />} color={`bg-gradient-success`}/>
                <StatCard title="Tổng Số Đơn Hàng" value={stats?.orders?.total || 0} icon={<i className="bi bi-people-fill" />} color={`bg-gradient-danger`}/>
                <StatCard title="Tổng Số Đơn Hàng" value={stats?.orders?.total || 0} icon={<i className="bi bi-bar-chart-line-fill" />} color={`bg-gradient-info`}/>
            </div>
        </>
    );
}

export default DashboardPage;
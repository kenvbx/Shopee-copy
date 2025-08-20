// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React from 'react';

// Component này nhận title và value làm props
const StatCard = ({ title, value, icon, color }) => {


    return (
        <div className="col">
            <div className="card radius-10">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <div>
                            <p className="mb-0 text-secondary">{title}</p>
                            <h4 className="my-1">{value}</h4>
                            <p className="mb-0 font-13 text-success">
                                <i className="bi bi-caret-up-fill" /> 5% from last week
                            </p>
                        </div>
                        <div className={`widget-icon-large ${color} text-white ms-auto`}>
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
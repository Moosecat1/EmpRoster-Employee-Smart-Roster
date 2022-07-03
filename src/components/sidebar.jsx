import React from 'react';
import '../css/sidebar.css';

function Sidebar() {
    return (
        <div class="d-flex flex-nowrap">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
                <a href="/" className="d-flex align-items-start mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi pe-none me-2" width="40" height="32">
                        <i className="bi bootstrap"></i>
                    </svg>
                    <span className="fs-4">Sidebar</span>
                </a>
                <hr />
                    <ul className="nav nav-pills flex-column mb-auto bg-dark">
                        <li className="nav-item">
                            <a href="#" className="nav-link active" aria-current="page">
                                <svg className="bi pe-none me-2" width="16" height="16">
                                    <i className="bi house-door"></i>
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-white">
                                <svg className="bi pe-none me-2" width="16" height="16">
                                    <i className="bi speedometer2"></i>
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-white">
                                <svg className="bi pe-none me-2" width="16" height="16">
                                    <i className="bi table"></i>
                                </svg>
                                Orders
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-white">
                                <svg className="bi pe-none me-2" width="16" height="16">
                                    <i className="bi grid"></i>
                                </svg>
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-white">
                                <svg className="bi pe-none me-2" width="16" height="16">
                                    <i className="bi person-circle"></i>
                                </svg>
                                Customers
                            </a>
                        </li>
                    </ul>
                    <hr />
            </div>
        </div>
    )
}
export default Sidebar;
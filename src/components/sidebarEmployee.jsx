import React from 'react';
import '../css/sidebar.css';

function SidebarEmployee() {
    return (
        <div className="d-flex flex-nowrap">
            <div className="side d-flex flex-column flex-shrink-0 p-1">

                <hr />
                <ul className="side-pills flex-column mb-auto">
                    <li className="side-item">
                        <a href="#" className="side-link active" aria-current="page">
                            <i className="bi bi-house-door"></i>
                            DashBoard
                        </a>
                    </li>
                    <li>
                        <a href="#" className="side-link text-black">
                            <i className="bi bi-printer"></i>
                            Request Leave
                        </a>
                    </li>
                    <li>
                        <a href="#" className="side-link text-black">
                            <i className="bi bi-people-fill"></i>
                            Employees
                        </a>
                    </li>
                    <li>
                        <a href="#" className="side-link text-black">
                            <i className="bi bi-gear"></i>
                            Settings
                        </a>
                    </li>
                    <li>
                        <a href="#" className="side-link text-black">
                            <i className="bi bi-calendar"></i>
                            Change Availability
                        </a>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    )
}
export default SidebarEmployee;
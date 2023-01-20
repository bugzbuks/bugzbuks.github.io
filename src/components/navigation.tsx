import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const useIsActive = (path: string) => {
    const location = useLocation();
    return location.pathname === path;
}

const Navigation = () => {
    const isHomeActive = useIsActive("/");
    const isTransferFundsActive = useIsActive("/transfer-funds");
    return (
        <nav className="navbar navbar-expand-lg navbar-light App-navbar">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/transfer-funds">Transfer Funds</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

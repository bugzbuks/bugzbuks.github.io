import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation.css';

const useIsActive = (path: string) => {
    const location = useLocation();
    return location.pathname === path;
}

const Navigation = () => {
    const isHomeActive = useIsActive("/");
    const isTransferFundsActive = useIsActive("/transfer-funds");
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active={isHomeActive}" to="/">Home</Link> |{" "}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active={isTransferFundsActive}" to="transfer-funds">Transfer Funds</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};


export default Navigation;

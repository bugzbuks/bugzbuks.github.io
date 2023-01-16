import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './navigation.css';

const useIsActive = (path: string) => {
    const location = useLocation();
    return location.pathname === path;
}

const Navigation = () => {
    const isHomeActive = useIsActive("/");
    const isTransferFundsActive = useIsActive("/transfer-funds");
    return (
        <Nav className="justify-content-end" style={{ display: "flex" }}>
            <Nav.Item style={{ paddingRight: "5px" }}>
                <Nav.Link as={NavLink} to="/" active={isHomeActive}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ paddingRight: "5px" }}>
                <Nav.Link as={NavLink} to="/transfer-funds" active={isTransferFundsActive}>Transfer Funds</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};


export default Navigation;

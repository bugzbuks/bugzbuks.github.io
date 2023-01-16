import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './navigation';
import TransferFunds from './transferFunds';
import Home from './home';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
                        </td>
                        <td>
                            <Navigation />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transfer-funds" element={<TransferFunds />} />
            </Routes>
        </Router>
    );
}

export default App;

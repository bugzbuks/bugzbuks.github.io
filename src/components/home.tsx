import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

const Home = () => {
    return (
        <div className="home-title">
            <h1>Thank you suport supporting your local charity</h1>
            <p>This utility allows you to make a donation you favourite NGO</p>
            <p>Select <a className="link-info" href="/transfer-funds">"Transfer Funds"</a> then complete the form</p>
            <p>This is a demo project created by James van der Walt for Stitch</p>
        </div>
    );
};

export default Home;
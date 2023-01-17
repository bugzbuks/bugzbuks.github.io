import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactJson from 'react-json-pretty';
import Navigation from './navigation';
import TransferFunds from './transferFunds';
import Home from './home';
import logo from './logo.png';
import './App.css';
import { retrieveTokenUsingClientSecret } from './stitchServices';
import clientInfo from './client.json';

interface IData {
    // your interface here
}
interface IProps {
    // your props here
}

let loading = false;

const App: React.FC<IProps> = ({ }) => {
    const [clientToken, setClientToken] = useState<IData>({});
    //const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        //Check if not already loading to stop repeat API calls
        if (!loading) {
            loading = true;
            console.log("clientToken = " + JSON.stringify(clientToken));
            //console.log("isLoading = " + isLoading);
            console.log("Inside useEffect");
            //setIsLoading(true);
            let timeoutId: NodeJS.Timeout;
            const fetchData = async () => {
                console.log("Inside fetchData");
                try {
                    timeoutId = setTimeout(() => {
                        setError(new Error("Timeout Error"));
                        loading = false;
                        console.log("Timeout while waiting for client token")
                    }, 5000);
                    const res = await retrieveTokenUsingClientSecret(clientInfo.client.id, clientInfo.secret.value);
                    const tokenReceived = res.access_token;//JSON.stringify(res);//await res.json();
                    console.log("tokenReceived = ", tokenReceived);
                    setClientToken(tokenReceived as IData);
                    console.log("Set loading to false");
                    loading = false;
                } catch (err) {
                    console.log("Error loading page",err);
                    setError(err as Error);
                    loading = false;
                    clearTimeout(timeoutId);
                }
            }

            fetchData().then(() => {
                clearTimeout(timeoutId);
                console.log('fetch client token complete. Reset timeout')
            });
        }
/*        return () => {
            clearTimeout(timeoutId);
        };*/
    
    }, []); // empty array means the effect will only run once on mount
    //Return the loading indicator if the ASYNC token call is still busy
    if (loading) {
        return (
            <div>
                {clientToken ? <ReactJson data={clientToken}/> : <div>Loading...</div>}
            </div>
        );
    } else {
        return (
            <Router>
                <table style={{ width: "90%" }} >
                    <tbody>
                        <tr>
                            <td style={{ width: "200px" }}>
                                <img src={logo} alt="Logo" style={{ width: "170px", height: "170px", padding: "20px" }} />
                            </td>
                            <td>
                                <Navigation />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div id='side-panel'></div>
                            </td>
                            <td>
                                <div id='main-body'>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/transfer-funds" element={<TransferFunds />} />
                                    </Routes>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Router>
        );
    }
}

export default App;

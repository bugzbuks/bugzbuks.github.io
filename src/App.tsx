import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { retrieveTokenUsingClientSecret } from './utils/stitchServices';

import Navigation from './components/navigation';
import TransferFunds from './components/transferFunds';
import Home from './components/home';
import clientInfo from './client.json';
import './App.css';

interface IData {
    // your interface here
}
interface IProps {
    // your props here
}

//Check whether the app is loading or not
let isLoading = false;

const App: React.FC<IProps> = () => {
    const [clientToken, setClientToken] = useState<IData>({});

    useEffect(() => {
        //Check if not already loading to stop repeat API calls
        if (!isLoading) {
            isLoading = true;
            console.log("clientToken = " + JSON.stringify(clientToken));
            let timeoutId: NodeJS.Timeout;
            const fetchData = async () => {
                console.log("Inside fetchData");
                try {
                    timeoutId = setTimeout(() => {
                        isLoading = false;
                        console.log("Timeout while waiting for client token")
                    }, 5000);
                    //Get the client token for the session
                    const res = await retrieveTokenUsingClientSecret(clientInfo.client.id, clientInfo.secret.value);
                    const tokenReceived = res.access_token;
                    console.log("tokenReceived = ", tokenReceived);
                    setClientToken(tokenReceived as IData);

                    console.log("Set loading to false");
                    isLoading = false;
                } catch (err) {
                    console.log("Error loading page",err);
                    isLoading = false;
                    clearTimeout(timeoutId);
                }
            }

            fetchData().then(() => {
                clearTimeout(timeoutId);
                console.log('fetch client token complete. Reset timeout')
            });
        }
    
    },[]); // empty array means the effect will only run once on mount

    // create an instance of the ApolloClient with the client token received
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: 'https://api.stitch.money/graphql',
            headers: {
                authorization: `Bearer ${clientToken}`
            }
        }),
    });

    //Return the loading indicator if the ASYNC token call is still busy
    if (isLoading) {
        return (
            <div>
                <div>Loading...</div>
            </div>
        );
    }
    //If not loading then render the application with all it's components
    else { 
        return (
            <ApolloProvider client={client}>
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <div className="App-logo-new"></div>
                            <nav className="App-navbar">
                                <Navigation />
                            </nav>
                        </header>
                        <div className="App-sidebar">
                            <div id='side-panel'>
                            </div>
                        </div>
                        <div className="App-main-body">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/transfer-funds" element={<TransferFunds />} />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}

export default App;

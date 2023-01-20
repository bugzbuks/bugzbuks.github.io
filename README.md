# Stitch Interview Demo
Author: James van der Walt

# Overview

The Project was developed the following:
- NPM 7.6.0
- Node 18.13.0
- React 13.4.0
- Apollo Client: 3.7.4

Bootstrap is used for the UI formatting

All fields are validated for input so that the API call to process the payment completes without fail
A client token is received using the Client Id and Secret Value
When the App start an Apollo client is configured to point to the Stich payment services, using the Bearer token received int he previous step. 
GraphQL was used to make the mutaion call for the payment

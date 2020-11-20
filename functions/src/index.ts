import * as functions from 'firebase-functions';
import { Request, Response } from 'express';

const apiUrl = 'http://localhost:8000';

const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

// Parse Query String
app.use(bodyParser.urlencoded({ extended: false }));

// Parse posted JSON body
app.use(bodyParser.json());

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.get('/', (req: any, res: { send: (arg0: any) => any; body: any; }) => res.send('Rest Working'));

const request = require('request');

app.get('/lumen', function(req: Request, res: Response){ 
   
    request(apiUrl, 
    function (error: any, response: any, body: any) {  
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
    });
});

app.post('/register', function(req: Request, res: Response){ 
    request(
        { 
        method: 'POST', 
        uri: apiUrl + '/register',
        headers: {'X_SITE_API_KEY': req.get('X_SITE_API_KEY')},
        body: req.body,
        json: true
        }
      , function (error: any, response: any, body: any) {  
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
        }
    )
});

app.post('/balance', function(req: Request, res: Response){ 
    request(
        { 
        method: 'POST', 
        uri: apiUrl + '/balance',
        headers: {'X_SITE_API_KEY': req.get('X_SITE_API_KEY')},
        body: req.body,
        json: true
        }
      , function (error: any, response: any, body: any) {  
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
        }
    )
});

app.post('/wallet/add', function(req: Request, res: Response){ 
    request(
        { 
        method: 'POST', 
        uri: apiUrl + '/wallet/add',
        headers: {'X_SITE_API_KEY': req.get('X_SITE_API_KEY')},
        body: req.body,
        json: true
        }
      , function (error: any, response: any, body: any) {  
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
        }
    )
});

app.post('/wallet/send', function(req: Request, res: Response){ 
    request(
        { 
        method: 'POST', 
        uri: apiUrl + '/wallet/send',
        headers: {
            'X_SITE_API_KEY': req.get('X_SITE_API_KEY'), 
            'X_SITE_AUTH_TOKEN': req.get('X_SITE_AUTH_TOKEN')},
        body: req.body,
        json: true
        }
      , function (error: any, response: any, body: any) {  
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
        }
    )
});


app.post('/wallet/update', function(req: Request, res: Response){ 
    request(
        { 
        method: 'POST', 
        uri: apiUrl + '/wallet/update',
        headers: {'X_SITE_API_KEY': req.get('X_SITE_API_KEY')},
        body: req.body,
        json: true
        }
      , function (error: any, response: any, body: any) {  
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
        }
    )
});

// Expose Express API as a single Cloud Function:
export const apiRest  = functions.https.onRequest(app);

// const apiUrl = 'http://localhost:8000';
// const proxy = require('express-http-proxy');
// app.use('/v1', proxy(apiUrl)); // this will proxy all incoming requests to /api route to back end
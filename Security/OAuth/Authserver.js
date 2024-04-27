const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mock database to store client information
const clientsDB = {
    "client1": {
        id: "client1",
        secret: "clientsecret1",
        redirect_uri: "http://localhost:3001/callback"
    }
};

// Mock database to store user information
const usersDB = {
    "user1": {
        id: "user1",
        username: "user1",
        password: "password1"
    }
};

app.use(session({
    secret: 'your_secret_here',
    resave: false,
    saveUninitialized: true
}));

// Authorization endpoint
app.get('/authorize', (req, res) => {
    const { response_type, client_id, redirect_uri } = req.query;

    // Check if client_id exists and redirect_uri is registered
    const client = clientsDB[client_id];
    if (!client || client.redirect_uri !== redirect_uri) {
        return res.status(401).send('Unauthorized client');
    }

    // Check if response_type is 'code'
    if (response_type !== 'code') {
        return res.status(400).send('Unsupported response type');
    }

    // Generate authorization code
    const authorizationCode = uuidv4();
    console.log(authorizationCode);
    // Save authorization code temporarily (in memory or database)
    // For this example, we'll just store it in memory
    req.session.authorizationCode = authorizationCode;
    console.log(req.session.authorizationCode);
    // Redirect to client's redirect_uri with authorization code
    const redirectUrl = `${redirect_uri}?code=${authorizationCode}`;
    res.redirect(redirectUrl);
});

// Token endpoint
app.post('/token', (req, res) => {
    const { grant_type, code, client_id, client_secret, redirect_uri } = req.body;

    // Check if grant_type is 'authorization_code'
    if (grant_type !== 'authorization_code') {
        return res.status(400).send('Unsupported grant type');
    }

    // Check if client_id and client_secret match
    const client = clientsDB[client_id];
    if (!client || client.secret !== client_secret) {
        return res.status(401).send('Invalid client credentials');
    }

    // Check if the provided code matches the stored authorization code
    if (code !== req.session.authorizationCode) {
        return res.status(400).send('Invalid authorization code');
    }

    // Generate and return access token and refresh token
    const accessToken = uuidv4();
    const refreshToken = uuidv4();

    // You may want to associate tokens with the user/client in a real scenario
    // For simplicity, we're just returning the tokens
    res.json({
        access_token: accessToken,
        refresh_token: refreshToken
    });
});

app.post('/verify_token', (req, res) => {
    const { access_token } = req.body;

    // Check if access token is present
    if (!access_token) {
        return res.status(400).json({ valid: false, error: 'Access token missing' });
    }

    //Add additional validation logic here if needed

    // If access token is present, consider it valid for this example
    res.json({ valid: true });
});

app.listen(5000, () => {
    console.log('Authorization server listening on http://localhost:5000');
});

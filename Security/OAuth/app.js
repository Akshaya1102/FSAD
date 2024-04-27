require('dotenv').config()

const express = require('express')
const session = require('express-session')
const request = require('request-promise')

const app = express()

app.use(session({
    secret: 'your_secret_here',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/login', (req, res) => {
    const authEndpoint = 'http://localhost:5000/authorize'

    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI
    })

    const authUrl = `${authEndpoint}?${queryParams}`

    res.redirect(authUrl)
})

/*app.get('/callback', async (req, res) => {
    const tokenEndpoint = 'https://localhost:5000/token'

    const { code } = req.query
    const requestBody = {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI
    }
    const options = {
        method: 'POST',
        uri: tokenEndpoint,
        form: requestBody,
        json: true
    }
    try {
        const response = await request(options)
        console.log(response.access_token)
        req.session.accessToken = response.access_token
        req.session.refreshToken = response.refresh_token

        res.redirect('/user')

    } catch (err) {
        res.send('Error retrieving access token')
    }
})*/

app.get('/callback', async (req, res) => {
    const tokenEndpoint = 'http://localhost:5000/token';

    const { code } = req.query.code;

    const requestBody = {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI
    };

    const options = {
        method: 'POST',
        uri: tokenEndpoint,
        form: requestBody,
        json: true
    };

    try {
        const response = await request(options);
        console.log("accesstoken"+response.access_token);
        console.log("refreshtoken"+response.refresh_token);
        // Check if response contains access_token
        if (response && response.access_token) {
            req.session.accessToken = response.access_token;
            req.session.refreshToken = response.refresh_token;

            res.redirect('/protected');
        } else {
            // Handle case where access_token is missing
            res.status(500).send('Access token not found in response');
        }
    } catch (err) {
        console.error('Error retrieving access token:', err.message);
        res.status(500).send('Error retrieving access token');
    }
});


app.get('/protected', async (req, res) => {

    res.send('here are product details')
    /*
    const userEndpoint = 'https://localhost:3000/products'
    const authtoken=req.session.accessToken;
    const options = {
        method: 'GET',
        headers: {
            Authorization: "Bearer"+" "+ authtoken
        },
        json: true
    }

    try {
        const response = await request.get(userEndpoint, options)
        res.send(response)
    } catch (err) {
        res.send('Error retrieving product info')
    }
    */
})

app.listen(3001, () => {
    console.log('Server listening on http://localhost:3001')
})
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // You can change the port as needed

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // Handle GET request
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Simple Node.js Web Page</title>
          </head>
          <body>
            <h1>Hello, World!</h1>
          </body>
        </html>
    `);
});

app.post('/sendRequest', (req, res) => {
    // Extract data from the client's request
    const data = req.body;

    // Define the URL of your backend server
    const backendUrl = 'https://findr-backend.vercel.app/api/user';

    // Make an HTTP POST request to your backend server
    axios.post(backendUrl, data, {
        headers: {
            'Content-Type': 'application/json',
            'apikey': '6508b27e2b66a05e77f8e04c'
        }
    })
        .then(response => {
            // Handle the response from your backend server
            if (response.status === 409) {
                // Email is already registered
                res.status(409).json({ error: 'Email already registered.' });
            } else if (response.status === 200) {
                // Request was successful
                console.log(response.data);
                res.json({ message: 'Request sent successfully to backend!' });
            } else {
                // Handle other response statuses as needed
                console.log(response.data);
                res.status(response.status).json({ error: 'Request to backend failed1.' });
                console.log('Email already exists');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Request to backend failed2!' });
        });
});

app.all('*', (req, res) => {
    // Handle other HTTP methods
    res.status(405).send('Method Not Allowed');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

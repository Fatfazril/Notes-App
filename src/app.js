const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
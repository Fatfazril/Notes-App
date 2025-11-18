const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
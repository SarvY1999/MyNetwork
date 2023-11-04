// Package Imports
const express = require('express');
require('dotenv').config();
require('express-async-errors')
const cookieParser = require('cookie-parser');
const app = express();

// function imports
const connectDb = require('./Db/connectDb');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');


app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use(errorHandler)

app.get('/api/v1/', (req, res) => {
    res.send('MyNetwork is online');
})

const start = async () => {
    const port = process.env.PORT || 4000;
    try {
        await connectDb(process.env.URI);
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
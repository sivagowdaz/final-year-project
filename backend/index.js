const express = require('express');
const app = express();
require('dotenv').config()

const authRouter = require('./routes/auth-router.js');
const crudRouter = require('./routes/crud-functions-router.js');

app.use(express.json())

//Routes
app.use('/api/auth', authRouter);
app.use('/api/crud', crudRouter);

const start = () => {
    try {
        app.listen(process.env.PORT, () => {console.log(`The server is running on port ${process.env.PORT}`);})
    } catch(err) {
        console.log(err.message);
    }
}

start();
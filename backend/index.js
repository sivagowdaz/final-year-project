const express = require('express');
const app = express();
require('dotenv').config()
var bodyParser = require('body-parser');

const socket = require("socket.io");

const authRouter = require('./routes/auth-router.js');
const crudRouter = require('./routes/crud-functions-router.js');
const blockchainRouter = require('./routes/blockchain-router.js');
const scannerRouter = require('./routes/scanner-router.js');

app.use(express.json())
app.use(bodyParser.json());
//Routes
app.use('/api/auth', authRouter);
app.use('/api/crud', crudRouter);
app.use('/api/blockchain', blockchainRouter);
app.use('/api/scanner', scannerRouter);

let server;

const start = () => {
    try {
        server = app.listen(process.env.PORT, () => {console.log(`The server is running on port ${process.env.PORT}`);})
    } catch(err) {
        console.log(err.message);
    }
}

start();

const io = socket(server, {
  cors: {
    origin: "http://localhost:5000",
    credentials: true,
  },
});

global.conn = {}

io.on('connection', (socket) => {
    if(socket) {
        console.log("socket connection is established");
        conn = socket
    }
})


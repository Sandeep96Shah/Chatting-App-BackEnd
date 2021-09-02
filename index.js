const express = require('express');
const port = process.env.PORT || 8000;

const app = express();

const cors = require('cors');

app.use(cors());

//youtube
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested:With, Content-Type, Accept"
    );
    next();
})

const dotenv = require('dotenv').config();

const db = require('./config/mongoose');

const sgMail = require('@sendgrid/mail');


// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
//changes
//chatServer.listen(process.env.SOCKET_PORT);
console.log(`chat server is listening on port ${process.env.SOCKET_PORT}`);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const JWT = require('./config/passport_jwt');

app.use('/', require('./routes/index'));
//changes
chatServer.listen(port, (err) => {
    if(err){
        console.log(`error while running on port`);
        return;
    }
    console.log(`Running on port ${port}`);
})
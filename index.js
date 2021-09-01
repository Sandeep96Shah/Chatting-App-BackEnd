const express = require('express');
const port = process.env.PORT;

const app = express();

const cors = require('cors');

app.use(cors());

const dotenv = require('dotenv').config();

const db = require('./config/mongoose');

const sgMail = require('@sendgrid/mail');


// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const JWT = require('./config/passport_jwt');

app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if(err){
        console.log("error while running on port 8000");
        return;
    }
    console.log("Running on port 8000");
})
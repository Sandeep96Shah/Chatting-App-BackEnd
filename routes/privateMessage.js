const express = require('express');

const router = express.Router({ mergeParams: true });

const messageController = require('../controllers/privateMessage');

router.get('/chatroom', messageController.chatroom);

router.post('/add', messageController.addMessage);

router.get("/", messageController.message);

module.exports = router;
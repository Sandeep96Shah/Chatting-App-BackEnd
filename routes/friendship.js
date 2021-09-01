const express = require('express');

const router = express.Router({ mergeParams: true });

const friendshipController = require('../controllers/friendship');

router.post('/', friendshipController.makeFriend);

module.exports = router;
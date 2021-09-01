const express = require('express');

const router = express.Router({ mergeParams: true });

const userController = require('../controllers/user');

router.post('/', userController.searchFriend);

module.exports = router;
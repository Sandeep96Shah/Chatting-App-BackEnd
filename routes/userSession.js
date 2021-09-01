const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/user');

router.post('/validate', usercontroller.validateUser);

router.post('/', usercontroller.createUser);

module.exports = router;
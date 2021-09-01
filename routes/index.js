const express = require('express');

const passport = require('passport');

const router = express.Router(({ mergeParams: true }));

const homecontroller = require('../controllers/home');

router.use('/userSession', require('./userSession'));

router.use('/friendship/:from/:to',passport.authenticate('jwt', {session: false}), require('./friendship'));

router.use('/allusers',passport.authenticate('jwt', {session: false}), require('./allusers'));

router.use('/privateMessage/:to',passport.authenticate('jwt', {session: false}), require('./privateMessage'));

router.use('/private/:from/:to',passport.authenticate('jwt', {session: false}), require('./privateMessage'));

router.use('/userFriends',passport.authenticate('jwt', {session: false}), require('./userFriends'));

router.use('/searchFriend',passport.authenticate('jwt', {session: false}), require('./searchFriend'));

router.get('/', homecontroller.home);

module.exports = router;
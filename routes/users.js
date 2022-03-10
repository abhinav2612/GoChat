const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');
const flash = require('connect-flash/lib/flash');
const { setFlash } = require('../config/middleware');


router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create, setFlash);

router.get('/sign-in', usersController.signIn);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession, setFlash);  

router.get('/sign-out', usersController.destroySession);

module.exports = router;
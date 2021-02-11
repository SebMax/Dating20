const session = require('express-session');
const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const mainController = require('../controllers/mainController');
const passport = require('passport');
const mongoose = require('mongoose');
const userController = require('../controllers/userController');

const controller = new mainController(new userModel);

controller.initialize(
    passport,
    email => controller.userModel.getOneUserByEmail(email),
);

router.get('/', controller.showHomePage);
router.get('/login', controller.showLoginPage);
router.get('/profil', controller.showProfile); 
router.get('/register', controller.showRegister);
router.get('/logout', controller.logout);
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect: '/profil',
}));

router.get('/swiping', controller.showMatches);
router.get('/delete', controller.deleteUser);
router.get('/matches', controller.getMatches);
router.get('/matches/unmatch/:id', controller.unmatch);
router.get('/swiping/dislikeOtherUsers/:id', controller.dislikeOthers);
router.get('/swiping/likeOtherUsers/:id', controller.like);
router.get('/swiping/match/:id', controller.match);


module.exports = router; 

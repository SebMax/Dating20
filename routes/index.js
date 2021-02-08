const session = require('express-session');
const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const mainController = require('../controllers/mainController');
const passport = require('passport');
const mongoose = require('mongoose');

const controller = new mainController(new userModel);

controller.initialize(
    passport,
    email => controller.userModel.getOneUserByEmail(email),
);
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect: '/profil',
}));
router.get('/homepage', controller.notVerified, controller.showHomePage);
router.get('/login', controller.verifiedUser, controller.showLoginPage);
router.get('/profil', controller.notVerified, controller.showProfile);
router.get('/register', controller.verifiedUser, controller.showRegister);
router.get('/logout', controller.logout);

/*
//Startside
router.get('/', (req, res) => res.render('velkommen')); 

//Login
router.get('/login', (req, res) => res.render('login'));

//Opret bruger
router.get('/register', (req, res) => res.render('register'));

//Homepage
router.get('/homepage', (req, res) => res.render('homepage'));

//Profil
router.get('/profil', (req, res) => res.render('profil'));

//Matches
router.get('/matches', (req, res) => res.render('matches'));
*/

module.exports = router; 

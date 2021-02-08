const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const userController = require('../controllers/userController');
const passport = require('passport');

const controller = new userController(new userModel);

//Laver en bruger
router.post('/', controller.createUser); 
 
//Login 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/login',
    })(req, res, next);
});


//Logud 
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
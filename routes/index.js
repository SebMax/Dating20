const express = require('express');
const router = express.Router();

//Startside
// router.get('/', (req, res) => res.send('velkommen')); 

//Login
router.get('/login', (req, res) => res.render('login'));

//Opret bruger
router.get('/register', (req, res) => res.render('register'));


//Homepage
//router.get('/homepage', (req, res) => res.render('homepage'));


module.exports = router; 

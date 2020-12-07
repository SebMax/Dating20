const express = require('express');
const router = express.Router();

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


module.exports = router; 

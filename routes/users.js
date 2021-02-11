const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const userController = require('../controllers/userController');
const passport = require('passport');

const controller = new userController(new userModel);

//Laver en bruger
router.post('/register', controller.createUser); 
//Opdater bruger
router.post('/update', controller.updateUser);
 

module.exports = router;
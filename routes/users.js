const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const userController = require('../controllers/userController');


const controller = new userController(new userModel);

//Laver en bruger
router.post('/', controller.createUser);

module.exports = router;
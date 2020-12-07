const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const userController = require('../controllers/userController');


const controller = new userController(new userModel);

//Laver en bruger
router.post('/', controller.createUser); 

//Finder en bruger
router.get('/:id', controller.getOneUser);

//Finder alle brugere
router.get('/', controller.getAll);

//Sletter en bruger 
router.delete('/:id', controller.deleteUser);

//Opdater en bruger
router.put('/:id', controller.updateUser);

module.exports = router;
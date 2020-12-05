const userSchema = require('../model/userSchema');
const userModel = require('../model/user');

class userController {
    constructor(userModel) {
        this.userModel = userModel
    }

    createUser = async(req, res) => {
        const newUser = new userSchema({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            age : req.body.age,
            gender : req.body.gender
        }); 

        let result = await this.userModel.createUser(newUser)
        res.send(result); 
    }

    deleteUser = async (req,res) => {
        let result = await this.userModel.deleteUser(req.params.id);
        res.send(result);
    }

    getOneUser = async (req, res) => {
        let searchResult = await this.userModel.getOneUser(req.params.id);
        res.send(searchResult);
    }

    getAll = async (req, res) => {
        let searchResult = await this.userModel.getAll();
        res.json(searchResult);
    }

    updateUser = async (req, res) => {
        const updateUser = new userSchema ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            gender: req.body.gender
        });
        let updateResult = await this.userModel.updateUser(updateUser, req.params.id);
        res.send(updateResult);
    }

}

module.exports = userController;
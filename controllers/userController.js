const userSchema = require('../model/userSchema');
const userModel = require('../model/user');

class userController {
    constructor(userModel) {
        this.userModel = userModel
    }

    createUser = async(req, res) => {
        let newUser = new userSchema({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            age : req.body.age,
            gender : req.body.gender
        }); 
        
        await this.userModel.createUser(newUser)
        res.render('../views/oprettet'); 
    }

    updateUser = async (req, res) => {
        await this.userModel.updateUser(req.body, req.session.passport.user); 
    };
};


module.exports = userController;
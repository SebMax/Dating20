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

}

module.exports = userController;
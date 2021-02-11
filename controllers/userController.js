const user = require('../model/userSchema');
const userModel = require('../model/user');

class userController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    createUser = async(req, res) => {
        let newUser = new user({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            age : req.body.age,
            gender : req.body.gender,
            liked : [],
            disliked : [],
            hasLikedMe : [],
            myMatches : []
        }); 
        
        await this.userModel.createUser(newUser)
        res.render('../views/login'); 
    }

    updateUser = async (req, res) => {
        await this.userModel.updatedUser(req.body, req.session.passport.user);
        res.redirect('/profil') 
    };
};


module.exports = userController;
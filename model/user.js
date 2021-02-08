const User = require('./userSchema');

class userModel {

    async createUser(user) {
      return User.create(user);     
    }
    
    async deleteUser(id) {
      return User.findByIdAndDelete(id);
    }

    async getOneUserByEmail(email) {
      return User.findOne({email: email}).exec();
    }

    async getAll() {
      return User.find({}, '_id').exec();
    }

    async getOneUserById(id) {
      return await User.findById(id).exec();
    }

    async updateUser(update, id) {
      return User.findByIdAndUpdate(id, update);
    }

}

module.exports = userModel;
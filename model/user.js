const userSchema = require('./userSchema');

class userModel {

    async createUser(user) {
      return userSchema.create(user);     
    }   
}

module.exports = userModel;
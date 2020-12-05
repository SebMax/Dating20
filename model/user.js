const { update } = require('./userSchema');
const User = require('./userSchema');
const userSchema = require('./userSchema');

class userModel {

    async createUser(user) {
      return userSchema.create(user);     
    }
    
    async deleteUser(user_object_id) {
      return userSchema.findByIdAndDelete(user_object_id);
    }

    async getOneUser(email) {
      return userSchema.find({email: email}).exec();
    }

    async getAll() {
      return userSchema.find().exec();
    }

    async updateUser(updateInfo, user_object_id) {
      if(updateInfo.name != undefined) {
        await userSchema.findByIdAndUpdate(user_object_id, {name: updateInfo.name});
      }
      if(updateInfo.email != undefined) {
        await userSchema.findByIdAndUpdate(user_object_id, {email: updateInfo.email});
      }
      if(updateInfo.password != undefined) {
        await userSchema.findByIdAndUpdate(user_object_id, {password: updateInfo.password})
      }
      if(updateInfo.age != undefined) {
        await userSchema.findByIdAndUpdate(user_object_id, {age: updateInfo.age});
      }
      if(updateInfo.gender != undefined) {
        await userSchema.findByIdAndUpdate(user_object_id, {gender: updateInfo.gender});
      }

      return userSchema.findById(user_object_id).exec();
    }
}

module.exports = userModel;
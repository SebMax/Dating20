const user = require('./userSchema');

class userModel {

    async createUser(newAccount) {
      return user.create(newAccount);     
    }
    
    async removeUser(id) {
      return user.findByIdAndDelete(id);
    }

    async getOneUserByEmail(email) {
      return user.findOne({email: email}).exec();
    }

    async getAll() {
      return user.find({}, '_id').exec();
    }

    async getOneUserById(id) {
      return await user.findById(id).exec();
    }

    async updatedUser(update, id) {
      return user.findByIdAndUpdate(id, update);
    }

    async getLikedUsersByID(id) {
      return user.findById(id, 'liked').exec();
    }

    async matchedUsers(id, userID) {
      await user.findByIdAndUpdate(id, {$push: {myMatches: userID}});
      return user.findByIdAndUpdate(userID, {$push: {myMatches: id}});
    }

    async unmatchUsers(id, userID) {
      return user.findByIdAndUpdate(userID, {$pull: {myMatches: id}});
    }

    async likeOtherUsers(id, userID) {
      return user.findByIdAndUpdate(userID, {$push: {liked: id}});
    }

    async getLikesFromUsers(id, userID) {
      return user.findByIdAndUpdate(id, {$push: {hasLikedMe: userID}});
    }

    async dislikeOtherUsers(id, userID) {
      return user.findByIdAndUpdate(userID, {$push: {disliked: id}});
    }

    async getDislikes(id) {
      return user.findById(id, 'disliked').exec();
    }

}

module.exports = userModel;
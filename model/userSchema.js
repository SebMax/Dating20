const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    liked: {
        type: Array,
        required: true
    },
    hasLikedMe: {
        type: Array,
        required: true
    },
    myMatches: {
        type: Array,
        required: true
    },
    disliked: {
        type: Array,
        required: true
    }
});

const user = mongoose.model('users', userSchema);


module.exports = user;
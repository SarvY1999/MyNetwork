const mongoose = require('mongoose');

// 1. Follow : Follower = my Id , following = user i want to follow
const FollowSchema = new mongoose.Schema({
    following : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    follower : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Follow', FollowSchema); 
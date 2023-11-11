const mongoose = require('mongoose');

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
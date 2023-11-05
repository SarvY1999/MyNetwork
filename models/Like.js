const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

LikeSchema.index({user: 1, post: 1}, {unique: true});


module.exports = mongoose.model('Like', LikeSchema);
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment : {
        type: String,
        maxLength: 50 
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    post: { 
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
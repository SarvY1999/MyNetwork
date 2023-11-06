const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

PostSchema.set('toJSON', {virtuals: true});
PostSchema.set('toObject', {virtuals: true});

PostSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'post',
    count: true
});

PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: "post",
    count: true
});

module.exports = mongoose.model('Post', PostSchema);
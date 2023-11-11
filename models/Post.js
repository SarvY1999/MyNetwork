const mongoose = require('mongoose');
const Like = require('./Like');
const Comment = require('./Comment');

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

PostSchema.pre('deleteOne', {document: true},  async function(){
    await Like.deleteMany({post: this._id});
    await Comment.deleteMany({post: this._id});
})

module.exports = mongoose.model('Post', PostSchema);
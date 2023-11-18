const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Follow = require('../models/Follow');

const Userschema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide an email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

Userschema.set('toJSON', {virtuals: true});
Userschema.set('toObject', {virtuals: true});

// for followers
Userschema.virtual('followers', {
    ref: 'Follow',
    localField: "_id",
    foreignField: "following",
    count: true
}); 

// for following
Userschema.virtual('following', {
    ref: 'Follow',
    localField: "_id",
    foreignField: "follower",
    count: true
})

Userschema.pre('save', async function () {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('User', Userschema);
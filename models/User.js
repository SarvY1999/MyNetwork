const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', Userschema);
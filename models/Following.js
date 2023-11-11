const mongoose = require('mongoose');

const Followingschema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    following : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Following', Followingschema); 
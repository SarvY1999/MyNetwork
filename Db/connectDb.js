const mongoose = require('mongoose');

const connectDb = (dbString) => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(dbString);
}

module.exports = connectDb;
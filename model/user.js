var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    account: String,
    name: String,
    pwd: String,
    date: Date,
    email: String,
    info: String,
    where: Number
});

module.exports = mongoose.model('User', userSchema);

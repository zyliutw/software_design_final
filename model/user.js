var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    account: String,
    name: String,
    pwd: String,
    date: String,
    email: String,
    info: String,
    manager: Boolean,
    where: Number
});

module.exports = mongoose.model('User', userSchema);

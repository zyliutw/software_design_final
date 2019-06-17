var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    birthday: Date,
    address: String,
    info: String,
    where: Number
});

module.exports = mongoose.model('User', userSchema);

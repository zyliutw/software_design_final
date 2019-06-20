var mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
    userAcc: String,
    userName: String,
    date: {type: Date, default: Date.now},
    body: String
});

module.exports = mongoose.model('Bulletin', bulletinSchema);

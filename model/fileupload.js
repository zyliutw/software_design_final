var mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    userAcc: String,
    userName: String,
    description: String,
    date: {type: Date, default: Date.now},
    captain: String,
    path: String,
});

module.exports = mongoose.model('file', fileSchema);
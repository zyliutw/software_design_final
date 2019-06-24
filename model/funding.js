var mongoose = require('mongoose');

const fundingSchema = new mongoose.Schema({
    id: Number,
    userAcc: String,
    userName: String,
    description: String,
    type: Number,  // 0 for income, 1 for expenditure
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('funding', fundingSchema);
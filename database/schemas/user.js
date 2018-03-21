let mongoose = require('mongoose')

module.exports = mongoose.Schema({
    avatar: String,
    hoten: String,
    sdt: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
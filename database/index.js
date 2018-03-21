let mongoose = require('mongoose')
mongoose.Promise = global.Promise



// [CONNECTION]
let {DB_path, DB_config} = require('../config')
mongoose.connect(DB_path, DB_config)
mongoose.connection
    .on('error', error => console.log(error.message))
    .once('open', () => console.log('ket noi thanh cong'))



// [SCHEMA]
let db = mongoose.connection
let {Schema} = mongoose

let User = db.model('User', require('./schemas/user.js'))



// [EXPORTS]
module.exports = db


let mongoose = require('mongoose')
mongoose.Promise = global.Promise



// [CONNECTION]
let {DB_path} = require('../config/database')
mongoose.connect(DB_path)
mongoose.connection
    .on('error', error => console.log(error.message))
    .once('open', () => console.log('ket noi thanh cong'))



// [SCHEMA]
let db = mongoose.connection
let {Schema} = mongoose

let userSchema = Schema({
    avatar: String,
    fullname: String,
    phone: String
})


let User = db.model('User', userSchema)

// [EXPORTS]
module.exports = db.modelNames


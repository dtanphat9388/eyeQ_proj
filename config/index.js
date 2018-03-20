// [DATABASE]
let DB_path = "mongodb://localhost:27017/test"
let DB_config = {}

// [WEB]
let WEB_uploadPath = process.cwd() + '/server/upload/'



module.exports = {
    DB_path, DB_config,
    WEB_uploadPath
}
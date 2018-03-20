let multer = require('multer')
let {WEB_uploadPath} = require(process.cwd() + '/config')

let storage = multer.diskStorage({
    destination: WEB_uploadPath,
    filename(req, file, cb){
        cb(null, file.originalname)
    }
})

module.exports = multer({storage})
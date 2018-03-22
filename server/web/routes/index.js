var express = require('express');
var router = express.Router();
let upload = require('../middlewares/multer.js')
let db = require(process.cwd() + '/database')
let middlewaresPath = '../middlewares/indexRoutes'



router.use(function(req, res, next){
  res.set('Access-Control-Allow-Origin',"http://localhost:8080")
  res.set('Access-Control-Allow-Headers', '*')
  next()
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(process.cwd() + '/index.html')
});


router.post('/dangky', upload.single('avatar'), require(middlewaresPath + '/dangky.js')(db) )
router.post('/getUsers', require(middlewaresPath + '/getUsers.js')(db) )
router.post( '/updateUser', require(middlewaresPath + '/updateUser.js')(db) )
router.post('/deleteUser', require(middlewaresPath + '/deleteUser.js')(db) )



module.exports = router;

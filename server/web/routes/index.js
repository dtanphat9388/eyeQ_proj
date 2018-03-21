var express = require('express');
var router = express.Router();
let upload = require('../middlewares/multer.js')
let db = require(process.cwd() + '/database')



router.use(function(req, res, next){
  res.set('Access-Control-Allow-Origin',"http://localhost:8080")
  next()
})

// router.use(express.urlencoded({extended: false}))
// router.use(express.json())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(process.cwd() + '/index.html')
});


router.post('/dangky', upload.single('avatar'), function(req, res, next){
  let { hoten, sdt } = req.body
  let avatar = req.file.originalname
  db.models.User.create({avatar, hoten, sdt})
    .then( user => console.log(user))
    .then( () => res.send('ok'))
    .catch( err => res.send({error: err.message}))
})


router.post('/getUsers', (req, res, next) => {
  db.models.User.find()
    .then( users => res.send(users))
    .catch( err => res.send({error: err.message}))
})

router.post('/updateUser', (req, res) => {
  console.log(req.body)
  res.send(true)
})


// router.post('/updateUser', (req, res) => {

// })


module.exports = router;

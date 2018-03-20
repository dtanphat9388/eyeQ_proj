var express = require('express');
var router = express.Router();
let upload = require('../middlewares/multer.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/dangky', upload.single('avatar'), function(req, res, next){
  res.set('Access-Control-Allow-Origin',"http://localhost:8080")

  console.log(req.headers)
  console.log(req.file)
  
  res.send(req.file)
})


router.post('/getinfo', (req, res, next) => {
  let filename = ''
  res.send
})

module.exports = router;

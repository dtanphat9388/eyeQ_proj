module.exports = function(db){
    return function(req, res, next){
        let { hoten, sdt } = req.body
        let avatar = req.file.originalname
        db.models.User.create({avatar, hoten, sdt})
          .then( user => console.log(user))
          .then( () => res.send('ok'))
          .catch( err => res.send({error: err.message}))
      }
}
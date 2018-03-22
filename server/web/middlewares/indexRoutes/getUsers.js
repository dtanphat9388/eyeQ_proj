module.exports = function(db){
    return (req, res, next) => {
        db.models.User.find()
          .then( users => res.send(users))
          .catch( err => res.send({error: err.message}))
      }
}
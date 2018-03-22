

module.exports = function(db){
    return (req, res) => {
        console.log(req.body)
        let newValue = {};
        let {_id} = req.body
        let {hoten, sdt} = req.body.newValue
      
        if (hoten != null) { newValue.hoten = hoten }
        if (sdt != null) { newValue.sdt = sdt }
      
        db.models.User.update({_id}, {$set: newValue})
          .then(() => res.send(true) )
          .catch(() => res.send(false))
    }
}
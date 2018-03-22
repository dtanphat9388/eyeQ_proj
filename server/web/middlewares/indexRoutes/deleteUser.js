let fs = require('fs')
let {WEB_uploadPath} = require(process.cwd() + '/config')

function removeAvatar(doc, res, db){
    let avatar = doc.avatar
    fs.unlink(WEB_uploadPath + '/' + avatar, err => {
        console.log(err)
        if (err) return res.send(false);
        removeDocument(doc, res, db)
    })
}

function removeDocument(doc, res, db){
    db.models.User.remove({_id: doc._id})
        .then( result => console.log(result))
        .then( () => res.send(true))
}

module.exports = function(db){
    return (req, res) => {
        let {_id} = req.body
        db.models.User.findById(_id)
          .then( doc => removeAvatar(doc, res, db) )
    }
}
  
  
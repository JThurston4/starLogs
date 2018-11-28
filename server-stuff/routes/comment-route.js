let router = require('express').Router()
let Comments = require('../models/comment')
let Users = require('../models/user')
let Ships = require('../models/ship')
let Logs = require('../models/log')

//get comment by id
router.get('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => res.send({ comment }))
    .catch(next)
})

router.get('/shipComments/:shipId', (req, res, next) => {
  Ships.findById(req.params.shipId)
    .then(ship => {
      Comments.find({ shipId: ship._id })
        .then(comments => {
          res.send(comments)
        })
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Comments.find({})
    .then(comment => res.send({ comment }))
    .catch(next)
})
///post/create a new comment
let link = '/:logId'
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  Comments.create(req.body)
    .then(comment => {
      res.send(comment)
    })
    .catch(next)
})





//delete a comment
router.delete('/:id', (req, res, next) => {
  //Validates is creator before deleting
  Comments.deleteOne({ _id: req.params.id, creatorId: req.session.uid })
    .then(comment => {
      Users.findOneAndUpdate({ _id: req.session.uid }, { comment: undefined })
        .then(user => {
          res.send({ message: "DELORTED", data: comment })
        })
    })
    .catch(next)
})

//update/modify an existing comment
router.put('/:id', (req, res, next) => {
  //Validates is creator before updating
  Comments.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { new: true })
    .then(comment => res.send(comment))
    .catch(next)
})

module.exports = router
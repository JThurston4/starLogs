let router = require('express').Router()
let Logs = require('../models/log')
let Users = require('../models/user')
let Ships = require('../models/ship')

//get log by id
router.get('/:id', (req, res, next) => {
  Logs.findById(req.params.id)
    .then(log => res.send({ log }))
    .catch(next)
})

router.get('/:shipId', (req, res, next) => {
  Ships.findById(req.params.shipId)
    .then(log => res.send({ log }))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Logs.find({})
    .then(log => res.send({ log }))
    .catch(next)
})

///post/create a new log
router.post('/', (req, res, next) => {
  req.body.author = req.session.uid
  req.body.shipId = Users.ship
  Logs.create(req.body)
    .then(log => {
      res.send(log)
    })
    .catch(next)
})





//delete a log
router.delete('/:id', (req, res, next) => {
  //Validates is creator before deleting
  Logs.deleteOne({ _id: req.params.id, creatorId: req.session.uid })
    .then(log => {
      Users.findOneAndUpdate({ _id: req.session.uid }, { log: undefined })
        .then(user => {
          res.send({ message: "DELORTED", data: log })
        })
    })
    .catch(next)
})

//update/modify an existing log
router.put('/:id', (req, res, next) => {
  //Validates is creator before updating
  Logs.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { new: true })
    .then(log => res.send(log))
    .catch(next)
})

module.exports = router
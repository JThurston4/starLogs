let router = require('express').Router()
let Ships = require('../models/ship')
let Users = require('../models/user')


//get ship by id
router.get('/:id', (req, res, next) => {
  Ships.findById(req.params.id)
    .then(ship => res.send({ ship }))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Ships.find({})
    .then(ship => res.send({ ship }))
    .catch(next)
})

///post/create a new ship
router.post('/', (req, res, next) => {
  Ships.create(req.body)
    .then(ship => {
      res.send(ship)
    })
    .catch(next)
})

//delete a ship
router.delete('/:id', (req, res, next) => {
  //Validates is creator before deleting
  Ships.deleteOne({ _id: req.params.id, creatorId: req.session.uid })
    .then(ship => {
      Users.findOneAndUpdate({ _id: req.session.uid }, { ship: undefined })
        .then(user => {
          res.send({ message: "DELORTED", data: ship })
        })
    })
    .catch(next)
})

//update/modify an existing ship
router.put('/:id', (req, res, next) => {
  //Validates is creator before updating
  Ships.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { new: true })
    .then(ship => res.send(ship))
    .catch(next)
})


// How you might allow for a non creator to edit
// router.put('/:id/purchased', (req, res, next) => {
//   let purchased = req.body.purchased
//   Ships.updateOne({_id: req.params.id}, {purchased}, { new: true })
//     .then(ship => res.send(ship))
//     .catch(next)
// })

module.exports = router
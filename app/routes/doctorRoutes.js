// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// pull in Mongoose model for doctor
const Doctor = require('../models/doctor')

const customErrors = require('../../lib/custom_errors')

const requireOwnership = customErrors.requireOwnership

const handle404 = require('./../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

// CREATE
// POST /examples
router.post('/doctors', requireToken, (req, res, next) => {
  req.body.doctor.owner = req.user._id
  const doctorData = req.body.doctor

  Doctor.create(doctorData)
    .then(doctor => res.status(201).json({ doctor }))
    .catch(next)
})

// INDEX
// GET /doctors
router.get('/doctors', requireToken, (req, res, next) => {
  Doctor.find({ owner: req.user.id })
    .then(doctors => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return doctors.map(doctor => doctor.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(doctors => res.status(200).json({ doctors: doctors }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /doctors/:id
router.get('/doctors/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Doctor.findById(id)
    .populate('owner')
    .then(handle404)
    .then(doctor => {
      res.status(200).json({ doctor })
    })
    .catch(next)
})

// UPDATE
// PATCH /doctors/:id
router.patch('/doctors/:id', requireToken, removeBlanks, (req, res, next) => {
  Doctor.findById(req.params.id)
    .then(handle404)
    .then(doctor => {
      requireOwnership(req, doctor)

      return doctor.updateOne(req.body.doctor)
    })
    .then(doctor => res.json({ doctor }))
    .catch(next)
})

// DESTROY
// DELETE /doctors/:id
router.delete('/doctors/:id', requireToken, (req, res, next) => {
  Doctor.findById(req.params.id)
    .then(handle404)
    .then((doctor) => {
      requireOwnership(req, doctor)

      doctor.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

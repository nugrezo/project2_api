// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/

const router = express.Router()

// pull in Mongoose model for doctor
const Doctor = require('../models/doctor')

// CREATE
// POST /examples
router.post('/doctors', (req, res, next) => {
  const doctorData = req.body.doctor

  Doctor.create(doctorData)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(doctor => {
      res.status(201).json({ doctor: doctor.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// INDEX
// GET /doctors
router.get('/doctors', (req, res, next) => {
  Doctor.find()
    .then(doctors => res.json({ doctors: doctors }))
    .catch(next)
})

// SHOW
// GET /doctors/:id
router.get('/doctors/:id', (req, res, next) => {
  const id = req.params.id
  Doctor.findById(id)
    .then(doctor => res.json({ doctor: doctor }))
    .catch(next)
})

// UPDATE
// PATCH /doctors/:id
router.patch('/doctors/:id', (req, res, next) => {
  const id = req.params.id
  const doctorData = req.body.doctor
  Doctor.findById(id)
    .then(doctor => doctor.updateOne(doctorData))
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /doctors/:id
router.delete('/doctors/:id', (req, res, next) => {
  const id = req.params.id
  Doctor.findById(id)
    .then(doctor => doctor.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

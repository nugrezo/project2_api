const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')

// see above for explanation of "salting", 10 rounds is recommended
const saltRounds = 10

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError

const User = require('../models/user')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// POST /sign-up
router.post('/sign-up', (req, res, next) => {
  const userData = req.body.credentials
  // if PW and PWC match
  if (userData.password === userData.passwordConfirmation) {
    // hash the password
    bcrypt.hash(userData.password, saltRounds)
      .then(function (hash) {
        // save the user with the hashed password
        return User.create({email: userData.email, hashedPassword: hash})
      })
      .then(user => res.status(201).json({ user }))
      .catch(next)
  } else {
    throw new Error('A required paramater was missing')
  }
})

// SIGN IN
// POST /sign-in
router.post('/sign-in', (req, res, next) => {
  const userData = req.body.credentials
  let userObj

  // find a user based on the email that was passed
  User.findOne({ email: userData.email })
    .then(function (result) {
      // if we didn't find a user with that email, send 401
      if (result === true) {
        userObj.token = crypto.randomBytes(16).toString('hex')
        return userObj.save()
      } else {
        throw new Error('Email or password is invalid')
      }
    })
    .then(function (user) {
      res.status(201).json({ user })
    })
    .catch(next)
})

// PATCH changePassword
router.patch('/change-password', requireToken, (req, res, next) => {
  let user
  // `req.user` will be determined by decoding the token payload
  User.findById(req.user.id)
  // save user outside the promise chain
    .then(record => { user = record })
  // check that the old password is correct
    .then(() => bcrypt.compare(req.body.passwords.old, user.hashedPassword))
  // `correctPassword` will be true if hashing the old password ends up the
  // same as `user.hashedPassword`
    .then(correctPassword => {
      // throw an error if the new password is missing, an empty string,
      // or the old password was wrong
      if (!req.body.passwords.new || !correctPassword) {
        throw new BadParamsError()
      }
    })
  // hash the new password
    .then(() => bcrypt.hash(req.body.passwords.new, saltRounds))
    .then(hash => {
      // set and save the new hashed password in the DB
      user.hashedPassword = hash
      return user.save()
    })
  // respond with no content and status 200
    .then(() => res.sendStatus(204))
  // pass any errors along to the error handler
    .catch(next)
})

router.delete('/sign-out', requireToken, (req, res, next) => {
  // create a new random token for the user, invalidating the current one
  req.user.token = crypto.randomBytes(16)
  // save the token and respond with 204
  req.user.save()
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

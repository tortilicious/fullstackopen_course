const bcrypt = require('bcrypt')
const express = require('express');
const usersRouter = express.Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  if (!req.body.password) {
    const passwordMissingError = new Error('Password is required')
    passwordMissingError.name = 'PasswordMissingError'
    return next(passwordMissingError)
  }

  if (req.body.password.length < 3) {
    const passwordTooShortError = new Error('Password must be at least 3 characters')
    passwordTooShortError.name = 'PasswordTooShortError'
    return next(passwordTooShortError)
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    hashedPassword: hashedPassword
  })

  const savedUser = await newUser.save()
  res.status(201).json(savedUser)

})

module.exports = usersRouter
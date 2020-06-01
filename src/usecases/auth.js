const createError = require('http-errors')

const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

// import user and admin models
const User = require('../models/user')
const Admin = require('../models/admin')

// function Login (validation general)
async function logIn (email, password) {
    
  if (!email) throw createError(400, 'Email is required')
  if (!password) throw createError(400, 'password is required')

  const user = await User.findOne({ email }).select('+password')
  const admin = await Admin.findOne({ email }).select('+password')
  const userInValidation = user || admin
  if (!userInValidation) throw createError(401, 'Invalid Data')

  const { password: hash } = userInValidation

  const isPasswordCorrect = await bcrypt.compare(password, hash)
  if (!isPasswordCorrect) throw createError(401, 'Invalid Data')

  const token = jwt.sign({ id: userInValidation._id })
  return {token, userId: userInValidation._id }
}

module.exports = {
  logIn
}
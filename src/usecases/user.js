const bcrypt = require('bcrypt')

const User = require('../models/user')
const jwt = require('../lib/jwt')

// Register function 
async function signup (userData) {
  const { email, password } = userData
  if (!email) throw new Error('Email is required')
  if (!password) throw new Error('password is required')

  const userAlreadyExist = await User.findOne({ email })

  if (userAlreadyExist) throw new Error('Email is already registered')
  if (password.length < 6) throw new Error('Password must be 6 characters minimun')
  const hash = await bcrypt.hash(password, 10)

  return User.create({ ...userData, password: hash })
}

// GET all users
function getUsers () {
  return User.find()
}

// GET user by id
function getUserById (id) {
  return User.findById(id)
}

// PATCH update user
function updateUser (id, newUserData) {
  return User.findByIdAndUpdate(id, newUserData, { new: true })
}

// DELETE user by id
function deleteById (id) {
  return User.findByIdAndDelete(id)
}

// PATCH update subscription
function subscriptionUpdate (id, newSubscription) {
  return User.findByIdAndUpdate(id, newSubscription, { new: true })
}

module.exports = {
  signup,
  getUsers,
  getUserById,
  updateUser,
  deleteById,
  subscriptionUpdate
}
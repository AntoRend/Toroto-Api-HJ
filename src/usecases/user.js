const bcrypt = require('bcrypt')
const createError = require('http-errors')

// import models
const User = require('../models/user')
const Subscription = require('../models/subscription').model
const jwt = require('../lib/jwt')

// Register function 
async function signup (userData) {
  const { email, password, subscription } = userData
  const hash = await bcrypt.hash(password, 10)
  // validation
  const subscriptionSearch = await Subscription.findOne({ plan: subscription.plan  })
  if (!subscriptionSearch) throw createError(409, `Subscription does not exists`)

  const userAlreadyExist = await User.findOne({ email })
  if (userAlreadyExist) throw createError(409, `User [${email}] already exists`)
  if (password.length < 6) throw createError(409, 'Password is to short')
  const newUser = new User ({ ...userData, password: hash, subscription: subscriptionSearch._id })

  const error = newUser.validateSync()
  if (error) throw error

  return newUser.save()
}

// login (proto)
async function login (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw createError(401, 'Invalid data')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw createError(401, 'Invalid data')

  return jwt.sign({ id: user._id })
}

// GET all users
function getUsers () {
  return User.find({})
    .populate('subscription')
}

// GET user by id
function getUserById (id) {
  return User.findById(id)
  .populate('subscription')
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
async function subscriptionUpdate (id, newSubscription) {
  const { subscription: {plan, isActive} } = newSubscription
  const subscriptionType = await Subscription.findOne({ plan })
  const date = new Date().toDateString()
  return User.findByIdAndUpdate(id, { subscription: subscriptionType._id, renewalDate: date }, { new: true })
}

module.exports = {
  signup,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteById,
  subscriptionUpdate
}
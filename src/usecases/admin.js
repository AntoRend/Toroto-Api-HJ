const bcrypt = require('bcrypt')
const createError = require('http-errors')

// import user and subscription Schemas
const Admin = require('../models/admin')
const Subscription = require('../models/subscription')

const jwt = require('../lib/jwt')

// Register function 
async function create (adminData) {
  const { email, password } = adminData
  const hash = await bcrypt.hash(password, 10)
  // input validation
  const adminAlreadyExist = await Admin.findOne({ email })
  if (adminAlreadyExist) throw createError(409, `Admin [${email}] already exists`)
  if (password.length < 6) throw createError(409, 'Password is to short')
  const newAdmin = new Admin ({ ...adminData, password: hash })

  const error = newAdmin.validateSync()
  if (error) throw error

  return newAdmin.save()
}

// Login function (proto)
async function login (email, password) {
  const user = await User.findOne({ email })
  if (!user) throw createError(401, 'Invalid data')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw createError(401, 'Invalid data')

  return jwt.sign({ id: user._id })
}

  // GET all 
  function getAll () {
    return Admin.find()
  }
  
  // GET One 
  function getById (id) {
    return Admin.findById(id)
  }

  // PATCH update 
  function updateById (id, newUserData) {
    return Admin.findByIdAndUpdate(id, newUserData, { new: true })
  }
  
  // DELETE by id
  function deleteById (id) {
    return Admin.findByIdAndDelete(id)
  }

  // create a new subscription type
  async function addSubscriptionType (SubscriptionData) {
    const { plan } = SubscriptionData
    const subscriptionExist =  await Subscription.findOne({ plan })
    if (subscriptionExist) throw createError(409, `Subscription already exists`)
    return Subscription.create(SubscriptionData)
  }
  
  module.exports = {
    create,
    login,
    getAll,
    getById,
    updateById,
    deleteById,
    addSubscriptionType
  }
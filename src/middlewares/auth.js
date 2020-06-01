const createError = require('http-errors')

const jwt = require('../lib/jwt')

const User = require('../models/user')
const Admin = require('../models/admin')

// authentication for users on page process
function userAuth (req, res, next) {
  // verify Authorization header in requests
  const { authorization: token } = req.headers
  console.log('Authorization', token)
  try {
    const decodedToken = jwt.verify(token)
    next()
  } catch (error) {
    res.status(401)
    res.json({
      success: false,
      message: 'Unauthorized'
    })
  }
}

// authentication for Admin on page process
async function adminAuth (req, res, next) {
  // verify Authorization header in requests
  const { authorization: token } = req.headers
  try {
    const decodedToken = await jwt.verify(token)
    const { id } = decodedToken 

    const admin = await Admin.findById(id)
    if (!admin) throw 'Unauthorized'
    next()
  } catch (error) {
    res.status(401)
    res.json({
      success: false,
      message: 'Unauthorized'
    })
  }
}

module.exports = {
  userAuth,
  adminAuth
}
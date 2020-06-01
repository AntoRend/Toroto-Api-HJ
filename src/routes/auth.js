const express = require('express')

// import authorization usecases functions
const auth = require('../usecases/auth')

const router = express.Router()

// Login validation 
router.post ('/login', async (req, res) => {
  try {
  const { email, password } = req.body
  const userData = await auth.logIn(email, password)

  res.json({
    success: true,
    message: 'Loged In',
    data: {
      token: userData.token,
      id: userData.userId
    }
  })    
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: error.message
    })  
  }
})

module.exports = router
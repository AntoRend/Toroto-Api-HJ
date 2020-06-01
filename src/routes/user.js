const express = require('express')

// import user usecases functions
const users = require('../usecases/user')
// import user and admin authorization middlewares
const { userAuth, adminAuth } = require('../middlewares/auth')

const router = express.Router()

// Registration request
router.post('/signup', async (req, res) => {
  try {
    // deconstructs input data
    const { 
      firstName = '',
      lastName = '',
      email= '',
      password = '',
      role = 'User',
      carbonFootPrint = '',
      subscription = {
        isActive: false,
        plan: 'none',
        cost: 0,
        renewalDate: 'none'
      } 
    } = req.body
    // build new user 
    const newUser = await users.signup({
      firstName,
      lastName,
      email,
      password,
      role,
      carbonFootPrint,
      subscription
    })
    // response
    res.json({
      success: true,
      message: 'User registered',
      data: {
        user: newUser
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// Request for users list (just Admin)
router.get('/', adminAuth, async (req, res) => {
  try {
      const allUsers = await users.getUsers()
      res.json({
          message: 'Toroto users',
          data: {
              Users: allUsers
          }
      })
  } catch (error) {
      res.status(400)
      res.json({
          succes: false,
          error: error.message
      })
  }
})

// Request for user info (by id)
router.get('/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const user = await users.getUserById(id)
    res.json({
      message: 'User info',
      data: {
        User: user
      }
    })
  } catch (error) {
      res.status(400)
      res.json({
        succes: false,
        error: error.message
    })
  }
})

//  Delete user (by id) (just for Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const userDeleted = await users.deleteById(id)
    res.json({
      success: true,
      message: 'User deleted',
      data: {
        User: userDeleted
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// Update user info 
router.patch('/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const userUpdated = await users.updateUser(id, req.body)
    res.json({
      success: true,
      message: 'User Updated',
      data: {
        user: userUpdated
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// Update subscription info (just Admin)
router.patch('/subscriptions/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const userUpdated = await users.subscriptionUpdate(id, req.body)
    res.json({
      success: true,
      message: 'Subscription added',
      data: {
        user: userUpdated
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})


module.exports = router
const express = require('express')

// import admin usecases functions
const admins = require('../usecases/admin')

// authorization middleware
const { adminAuth } = require('../middlewares/auth')

const router = express.Router()
router.use(adminAuth)

// Create new admin request (just for admin)
router.post('/', async (req, res) => {
  try {
    const { 
      firstName = '',
      lastName = '',
      email= '',
      password = '',
      role = 'Admin',
    } = req.body
    const newAdmin = await admins.create({
      firstName,
      lastName,
      email,
      password,
      role
    })
    res.json({
      success: true,
      message: 'Administrator created',
      data: {
        Administrator: newAdmin
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

// Request for all admins list (just for admin)
router.get('/', async (req, res) => {
  try {
      const allAdmins = await admins.getAll()
      res.json({
          message: 'Toroto admins',
          data: {
              Administrators: allAdmins
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

// Request for one admin info (by ID) (just for admin)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const admin = await admins.getById(id)
    res.json({
      message: 'Admin info',
      data: {
        Admin: admin
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

// Delete Admin (by ID) (just for admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const AdminDeleted = await admins.deleteById(id)
    res.json({
      success: true,
      message: 'Admin deleted',
      data: {
        Admin: AdminDeleted
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

// Update Admin info (just for admin)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const AdminUpdated = await admins.updateById(id, req.body)
    res.json({
      success: true,
      message: 'Admin Updated',
      data: {
        Admin: AdminUpdated
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

// Add a new user subscription (just for admin)
router.post('/subscriptions', async (req, res) => {
  try {
    const newSubscription = await admins.addSubscriptionType(req.body)
    res.json({
      success: true,
      message: 'Subscription created',
      data: {
        Subscription: newSubscription
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
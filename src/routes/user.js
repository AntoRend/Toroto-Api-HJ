const express = require('express')

const users = require('../usecases/user')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newUser = await users.signup(req.body)
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

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const userUpdated = await users.updateUser(id, req.body)
    res.json({
      success: true,
      message: 'Post Updated',
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
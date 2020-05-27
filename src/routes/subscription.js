const express = require('express')

const users = require('../usecases/user')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newSubscription = await users.subscriptionUpdate(req.body)
    res.json({
      success: true,
      message: 'User subscribed',
      data: {
        subscriptionInfo: newSubscription
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
const mongoose = require('mongoose')

// subscription model
const subscriptionSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    require: true
  },
  plan: {
    type: String,
    enum: ['none', 'Basic', 'Silver', 'Gold'],
    require: true
  },
  cost: {
    type: Number,
    require: true,
  },
  renewalDate: {
    type: String,
    require: true,
  },
  newsletter: {
    type: Boolean,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    default: 0
  }
})

const model = mongoose.model('subscription', subscriptionSchema)

module.exports = {
  model,
  schema: subscriptionSchema
}
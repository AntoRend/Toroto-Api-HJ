const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      minlength: 3,
      require: [true, "can't be empty"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    lastName: {
      type: String,
      minlength: 3,
      require: [true, "can't be empty"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    email: {
      type: String,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      require: [true, "can't be empty"],
      trim: true
    },
    password: {
      type: String,
      require: [true, "can't be empty"],
      trim: true
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
      required: true
    },
    carbonFootprint: {
      type: Number,
      required: true,
      default: 3.87
    },
    subscription: {
      isActive: {
        type: Boolean,
        default: false,
        require: true
      },
      plan: {
        type: String,
        enum: ['none', 'Basic', 'Silver', 'Gold'],
        default: 'none',
        require: true
      },
      cost: {
        type: Number,
        require: true,
        default: 0
      },
      renewalDate: {
        type: String,
        require: true,
        default: "none"
      }
    }
})

module.exports = mongoose.model('users', userSchema)
const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types } = Schema

// user model
const userSchema = new Schema({
  firstName: {
      type: String,
      minlength: 3,
      require: true,
      trim: true,
      lowercase: true
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      index: true,
      lowercase: true,
      require: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
      trim: true,
      select: false
    },
    role: {
      type: String,
      enum: ['User'],
      required: true
    },
    carbonFootprint: {
      type: Number,
      required: true,
      default: 3.87
    },
    subscription: {
      type: Types.ObjectId,
      ref: 'subscription'
    }
})

module.exports =  mongoose.model('users', userSchema)


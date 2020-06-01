const mongoose = require('mongoose')

// user model 
const userSchema = new mongoose.Schema ({
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
    enum: ['Admin'],
    required: true
  },
})

module.exports = mongoose.model('admins', userSchema)
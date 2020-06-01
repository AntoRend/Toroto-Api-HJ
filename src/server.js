const express = require('express')
const cors = require('cors')

// import routes as Router
const usersRouter = require('./routes/user')
const adminRouter = require('./routes/admins')
const authRouter = require('./routes/auth')

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
app.use('/administrators', adminRouter)
app.use('/auth', authRouter)

module.exports = app
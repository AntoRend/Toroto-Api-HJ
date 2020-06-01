const mongoose = require('mongoose')
// database URL 
const db_user = 'ltonnito'
const db_Password = 'Kodemia123'
const db_host = 'kodemiaseptimag-bnup1.mongodb.net'
const db_name = 'Toroto'

const url = `mongodb+srv://${db_user}:${db_Password}@${db_host}/${db_name}`

function connect () {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = {
  connect
}

const jwt = require('jsonwebtoken')

const secret = 'TorotoPass'

// modify jwt properties with our parameters

function sign (payload = {}) {
  return jwt.sign(payload, secret)
}

function verify (token = '') {
  return jwt.verify(token, secret)
}


module.exports = {
  ...jwt,
  sign,
  verify
}

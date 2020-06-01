const server = require('./src/server')
const dataBase = require('./src/lib/db')

// connection Port
const PORT = process.env.PORT || 8080

async function main() {
  await dataBase.connect()
  console.log('DataBase is connected')
  server.listen(PORT, () => {
    console.log('Server is running')
  })
}

main()
  .then(() => console.log('Server Ready'))
  .catch(e => console.log('error:', e))


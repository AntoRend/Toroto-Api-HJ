const server = require('./src/server')
const dataBase = require('./src/lib/db')

async function main() {
  await dataBase.connect()
  console.log('DataBase is connected')
  server.listen(8082, () => {
    console.log('Server is running')
  })
}

main()
  .then(() => console.log('Server Ready'))
  .catch(e => console.log('error:', e))


const http = require('http')
const path = require('path')
const {
  readFileSync,
  writeFileSync,
  read
} = require('fs')

const port = 8000

const dataFile = path.join(__dirname, '../calendar-data.csv')

const getEventById = (req, res) => {
  const id = req.url.split('/')[2]
  const events = readFileSync(dataFile).toString().split('\n')
  const event = events.find((it) => it.split(',')[0] === id)
  res.writeHead(200)
  res.end(event)
}

const notFoundHandler = (req, res) => {
  res.writeHead(404)
  res.end()
} 

const routes = [
  [/\/events\/\d+/, getEventById]
]

const getRouteHandler = (req) => {
  const handler = routes.find((it) => it[0].test(req.url))
  return handler ? handler[1] : notFoundHandler
}
  
const server = http.createServer((req, res) =>
  getRouteHandler(req)(req, res)
)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
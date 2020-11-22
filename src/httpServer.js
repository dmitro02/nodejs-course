const http = require('http')
const logger = require('./logger')
const { nanoid } = require('nanoid')
const { AsyncLocalStorage } = require('async_hooks') 

const port = 8000

const getRequestParams = (req) => {
  let requestParams
  const paramString = req.url.split('?')[1]
  if (paramString) {
    requestParams = {}
    paramString.split('&').forEach((it) => {
      const [ key, value ] = it.split('=')
      if (key) requestParams[key] = value ? value : null
    })
  }
  return requestParams
} 

const getEvents = (req, res) => {
  const params = getRequestParams(req)
  const events = params 
    ? `Events filtered by parameters: ${JSON.stringify(params)}` 
    : 'All events'
  res.writeHead(200)
  res.end(events)
}

const getEventById = (req, res) => {
  const id = req.url.split('/')[2]
  res.writeHead(200)
  res.end('event' + id)
}

const getUsers = (req, res) => {
  const params = getRequestParams(req)
  const users = params 
    ? `Users filtered by parameters: ${JSON.stringify(params)}` 
    : 'All users'
  res.writeHead(200)
  res.end(users)
}

const getUserById = (req, res) => {
  const id = req.url.split('/')[2]
  res.writeHead(200)
  res.end('user' + id)
}

const getMainPage = (req, res) => {
  res.writeHead(200)
  res.end('<h1>Main Page</h1>')
}

const createEvent = (req, res) => {
  let data = ''
  req.on('data', (chunk) => data += chunk)
  req.on('end', () => {
    res.writeHead(201)
    res.end('Event created: ' + data)
  })
}

const createUser = (req, res) => {
  let data = ''
  req.on('data', (chunk) => data += chunk)
  req.on('end', () => {
    res.writeHead(201)
    res.end('User created: ' + data)
  })
}

const notFoundHandler = (req, res) => {
  res.writeHead(404)
  res.end('<h1>Not found</h1>')
} 

const routes = {
  GET: [
    [ /\/events\/\d+/, getEventById ],
    [ /\/users\/\d+/, getUserById ],
    [ /\/events/, getEvents ],
    [ /\/users/, getUsers ],
    [ /\/.+/, notFoundHandler ],
    [ /\//, getMainPage ]
  ],
  POST: [
    [ /\/events/, createEvent ],
    [ /\/users/, createUser ],
    [ /\/.+/, notFoundHandler ]
  ]
}

const asyncLocalStorage = new AsyncLocalStorage()

const server = http.createServer((req, res) => {
  asyncLocalStorage.run(nanoid(), () => {
    logRequest(req)
    routes[req.method.toUpperCase()]
    .find((it) => it[0].test(req.url))[1](req, res)
  }) 
})

server.listen(port, () => logger.info(`Server is running on port ${port}`))

const logRequest = (req) => {
  const { method, url } = req  
  logger.info({
    request: {
      id: asyncLocalStorage.getStore(),
      method,
      url
    }
  })
}

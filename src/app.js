const express = require('express')
const { 
  getEvents, 
  getEventById, 
  createEvent,
  updateEvent,
  deleteEvent
} = require('./csvUtils')
const logger = require('./logger')
const expressPino = require('express-pino-logger')
const JwtManager = require('./jwtManager')

const { port } = require('./config')

const expressLogger = expressPino({ logger })

const jwtManager = new JwtManager()

const app = express()
app.use(express.json())
app.use(expressLogger)

const getTokenFromHeaders = (req) => {
  return req.headers.authorization.split('Bearer')[1].trim()
}

const checkAccess = (req, res, next) => {
  const accessToken = getTokenFromHeaders(req)
  if (!jwtManager.isAccessTokenValid(accessToken)) {
    res.sendStatus(401)
  } else {
    next()
  }
}

app.get('/events', (req, res) => {
  getEvents(req.query.location)
    .on('error', (e) => {
      logger.error(e)
      res.status(500).end(e.message)
    })
    .pipe(res)
})

app.get('/events/:eventId', (req, res) => {
  getEventById(req.params.eventId)
    .on('error', (e) => {
      logger.error(e)
      res.status(500).end(e.message)
    })
    .pipe(res)
})

app.post('/events', async (req, res) => {
  try {
    await createEvent(req.body)
    res.sendStatus(201)
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.put('/events/:eventId', async (req, res) => {
  try {
    await updateEvent(req.params.eventId, req.body)
    res.end('updated')
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.delete('/events/:eventId', async (req, res) => {
  try {
    await deleteEvent(req.params.eventId)
    res.end('deleted')
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.post('/login', (req, res) => {
  const tokens = jwtManager.generateTokens()
  res.type('json')
  res.end(JSON.stringify(tokens))
})

app.get('/refresh_tokens', (req, res) => {
  const refreshToken = getTokenFromHeaders(req)
  const newTokens = jwtManager.refreshTokens(refreshToken)
  if (newTokens) {
    res.type('json')
    res.end(JSON.stringify(newTokens))
  } else {
    res.sendStatus(401)
  }
})

app.get('/check_access', checkAccess, (req, res) => {
  res.end('OK')
})

app.listen(port, () =>
  logger.info(`Server listening at http://localhost:${port}`))

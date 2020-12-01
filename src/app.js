const express = require('express')
const logger = require('./logger')
const expressPino = require('express-pino-logger')
const { 
  createEvent,
  getEvents,
  getEventById, 
  updateEvent,
  deleteEvent,
  createUser,
  deleteUser,
  inviteUser,
  inviteUsers
} = require('./dbService')

const { port } = require('./config')

const expressLogger = expressPino({ logger })

const app = express()
app.use(express.json())
app.use(expressLogger)

app.get('/events', async (req, res) => {
  try {
    const result = await getEvents(req.query.location)
    res.end(JSON.stringify(result, null, 2))
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.get('/events/:eventId', async (req, res) => {
  try {
    const result = await getEventById(req.params.eventId)
    if (!result) {
      res.sendStatus(404) 
    } else {
      res.end(JSON.stringify(result, null, 2))
    }
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
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
    const result = await updateEvent(req.params.eventId, req.body)
    if (!result[0]) {
      res.sendStatus(404) 
    } else {
      res.end('updated')
    }
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.delete('/events/:eventId', async (req, res) => {
  try {
    const result = await deleteEvent(req.params.eventId)
    if (!result) {
      res.sendStatus(404) 
    } else {
      res.end('deleted')
    }
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.post('/users', async (req, res) => {
  try {
    await createUser(req.body)
    res.sendStatus(201)
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.delete('/users/:userId', async (req, res) => {
  try {
    const result = await deleteUser(req.params.userId)
    if (!result) {
      res.sendStatus(404) 
    } else {
      res.end('deleted')
    }
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.post('/participants', async (req, res) => {
  try {
    const { eventId, userId } = req.query
    if (Array.isArray(userId)) {
      await inviteUsers(eventId, userId)
    } else {
      await inviteUser(eventId, userId)
    }
    res.sendStatus(201)
  } catch(e) {
    logger.error(e)
    res.status(500).end(e.message)
  }
})

app.listen(port, () =>
  logger.info(`Server listening at http://localhost:${port}`))

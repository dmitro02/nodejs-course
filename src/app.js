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

const { port } = require('./config')

const expressLogger = expressPino({ logger })

const app = express()
app.use(express.json())
app.use(expressLogger)

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

app.listen(port, () =>
  logger.info(`Server listening at http://localhost:${port}`))

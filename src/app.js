const express = require('express')
const { 
  getEvents, 
  getEventById, 
  createEvent,
  updateEvent,
  deleteEvent
} = require('./csvUtils')
const { port } = require('./config')

const app = express()
app.use(express.json())

app.get('/events', (req, res) => {
  getEvents(req.query.location).pipe(res)
})

app.get('/events/:eventId', (req, res) => {
  getEventById(req.params.eventId).pipe(res)
})

app.post('/events', async (req, res) => {
  await createEvent(req.body)
  res.sendStatus(201)
})

app.put('/events/:eventId', (req, res) => {
  updateEvent(req.params.eventId, req.body)
    .then((result) => res.end(result))
    .catch((error) => res.sendStatus(500).end(error))
})

app.delete('/events/:eventId', (req, res) => {
  deleteEvent(req.params.eventId,)
  .then((result) => res.end(result))
  .catch((error) => res.sendStatus(500).end(error))
})

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`))

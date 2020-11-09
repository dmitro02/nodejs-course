const express = require('express')
const { 
  createReadStream, 
  createWriteStream
} = require('fs')
const { 
  unlink, 
  rename,
  appendFile 
} = require('fs').promises
const readline = require('readline');
const path = require('path')
const csv = require('csvtojson');
const Filter = require('./filter')
const { port } = require('./config')

const dataFile = path.join(__dirname, '../calendar-data.csv')
const tempFile = path.join(__dirname, '../calendar-data.tmp')

const app = express()
app.use(express.json())

app.get('/events', (req, res) => {
  const readStream = createReadStream(dataFile)

  const filter = new Filter()
  const { location } = req.query
  if (location) {
    filter.predicate = (it) => JSON.parse(it).location === location
  }
    
  readStream 
    .pipe(csv())
    .pipe(filter)
    .pipe(res)
})

app.get('/events/:eventId', (req, res) => {
  const readStream = createReadStream(dataFile)

  const filter = new Filter((it) => JSON.parse(it).id === req.params.eventId)

  readStream 
    .pipe(csv())
    .pipe(filter)
    .pipe(res)
})

app.post('/events', async (req, res) => {
  await appendFile(dataFile, Object.values(req.body).join(',') + '\n')
  res.sendStatus(201)
})

app.put('/events/:eventId', (req, res) => {
  const readStream = createReadStream(dataFile)
  const writeStream = createWriteStream(tempFile)

  const { eventId } = req.params

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  })
  
  rl.on('line', (line) => {
    if (line.split(',')[0] !== eventId) {
      writeStream.write(line + '\n')
    } else {
      writeStream.write(Object.values(req.body).join(',') + '\n')
    }
  })

  rl.on('close', async () => {
    try {
      writeStream.close()
      await unlink(dataFile)
      await rename(tempFile, dataFile)
      res.end(`event with ID=${eventId} successfully updated`)
    } catch(e) {
      res.end(`failed to update event with ID=${eventId}\n\n${e}`)
    }
  })
})

app.delete('/events/:eventId', (req, res) => {
  const readStream = createReadStream(dataFile)
  const writeStream = createWriteStream(tempFile)

  const { eventId } = req.params

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  })
  
  rl.on('line', (line) => {
    if (line.split(',')[0] !== eventId) {
      writeStream.write(line + '\n')
    }
  })

  rl.on('close', async () => {
    try {
      writeStream.close()
      await unlink(dataFile)
      await rename(tempFile, dataFile)
      res.end(`event with ID=${eventId} successfully deleted`)
    } catch(e) {
      res.end(`failed to delete event with ID=${eventId}\n\n${e}`)
    }
  })
})

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`))

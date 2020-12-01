const { 
  createReadStream, 
  createWriteStream
} = require('fs')
const { 
  unlink, 
  rename,
  appendFile 
} = require('fs').promises
const readline = require('readline')
const path = require('path')
const csv = require('csvtojson')
const Filter = require('./filter')

const dataFile = path.join(__dirname, '../calendar-data.csv')
const tempFile = path.join(__dirname, '../calendar-data.tmp')

const getEvents = (location) => {
  const filter = new Filter()
  if (location) {
    filter.predicate = (it) => JSON.parse(it).location === location
  }

  return createReadStream(dataFile) 
    .on('error', (e) => filter.emit('error', e))
    .pipe(csv())
    .on('error', (e) => filter.emit('error', e))
    .pipe(filter)
}

const getEventById = (eventId) => {
  const filter = new Filter((it) => JSON.parse(it).id === eventId)
    
  return createReadStream(dataFile) 
    .on('error', (e) => filter.emit('error', e))
    .pipe(csv())
    .on('error', (e) => filter.emit('error', e))
    .pipe(filter)
}

const createEvent = (eventJson) => {
  return appendFile(dataFile, toCsvLine(eventJson) + '\n')
}

const updateEvent = (eventId, eventJson) => {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(dataFile)
    const writeStream = createWriteStream(tempFile)

    readStream.on('error', reject)
    writeStream.on('error', reject)
  
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    })
    
    rl.on('line', (line) => {
      if (line.split(',')[0] !== eventId) {
        writeStream.write(line + '\n')
      } else {
        writeStream.write(toCsvLine(eventJson) + '\n')
      }
    })
  
    rl.on('close', async () => {
      try {
        writeStream.close()
        await unlink(dataFile)
        await rename(tempFile, dataFile)
        resolve()
      } catch(e) {
        reject(e)
      }
    })
  })
}

const deleteEvent = (eventId) => {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(dataFile)
    const writeStream = createWriteStream(tempFile)

    readStream.on('error', reject)
    writeStream.on('error', reject)

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
        resolve()
      } catch(e) {
        reject(e)
      }
    })
  })
}

const toCsvLine = (eventJson) => {
    const {
        id = '',
        title = '',
        datetime = '',
        repeat = '',
        location = '',
        room = '',
        link = '',
        description = ''
      } = eventJson
  
    return `${id},${title},${datetime},${repeat},${location},${room},${link},${description}`
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
}
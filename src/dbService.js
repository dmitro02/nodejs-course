const { Sequelize } = require('sequelize')
const initModels = require('./models/init-models')
const logger = require('./logger')

const sequelize = new Sequelize({
    host: '34.89.206.41',
    port: 3306,
    database: 'calendar',
    username: 'root',
    password: 'bosean',
    dialect: 'mysql'
});

const {
    Event,
    Participant,
    User,
  } = initModels(sequelize)

const createEvent = async (event) => {
    return await Event.create({ ...event })
}

const getEvents = async (location) => {
    const opt = location 
        ? { where: { location } }
        : {}
    return await Event.findAll(opt)
}

const getEventById = async (id) => {
    return await Event.findByPk(id)
}

const updateEvent = async (id, updatedEvent) => {
    return await Event.update(updatedEvent, {
        where: { id }
    })
}

const deleteEvent = async (id) => {
    return await Event.destroy({
        where: { id }
    })
}

// Example: createUser('jabba@starwars.com', 'Jabba', 'Hutt')
const createUser = async (email, first_name, last_name) => {
    return await User.create({ 
        email,
        first_name,
        last_name,
    })
}

const getUserByEmail = async (email) => {
    const users = await User.findAll({
        where: { email }
    })
    if (users.length) {
        return users[0]
    } else {
        return null
    }
}

const inviteUser = async (event, user) => {
    return await Participant.create({
        event_id: event.id,
        user_id: user.id
    })
}

const inviteUserExample = async () => {
    const user = await getUserByEmail('letov@go.org')
    const event = await getEventByTitle('My First Event')

    if (!user || !event) {
        console.log('some of args is null')
        return
    }

    await inviteUser(event, user)
}

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        logger.info('Connection to DB has been established successfully.')
    } catch (e) {
        logger.error('Unable to connect to the DB:', e)
    }
}

testConnection()

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}
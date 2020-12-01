const { 
    dbHost, 
    dbPort, 
    dbName, 
    dbUser, 
    dbPass, 
    dbDialect,
    dbStorage 
} = require('./config')
const { Sequelize } = require('sequelize')
const logger = require('./logger')

const modelsFolder = dbDialect === 'sqlite' 
    ? 'models.sqlite' : 'models.mysql'

const initModels = require(`./${modelsFolder}/init-models`)

const sequelize = new Sequelize({
    host: dbHost,
    port: dbPort,
    database: dbName,
    username: dbUser,
    password: dbPass,
    dialect: dbDialect,
    storage: dbStorage
});

const {
    Event,
    Participant,
    User,
  } = initModels(sequelize)

const withParticipants = { 
    include: {
        model: Participant,
        attributes: ['id'],
        include: User
    }
}

const createEvent = async (event) => {
    return await Event.create(event)
}

const getEvents = async (location) => {
    const options = { ...withParticipants }
    if (location) options.where = { location }

    return await Event.findAll(options)
}

const getEventById = async (id) => {
    return await Event.findByPk(id, withParticipants)
}

const updateEvent = async (id, updatedEvent) => {
    return await Event.update(updatedEvent, { where: { id } })
}

const deleteEvent = async (id) => {
    return await Event.destroy({ where: { id } })
}

const createUser = async (user) => {
    return await User.create(user)
}

const deleteUser = async (id) => {
    return await User.destroy({ where: { id } })
}

const inviteUser = async (event_id, user_id) => {
    return await Participant.create({ event_id, user_id })
}

const inviteUsers = async (event_id, userIds) => {
    const invitations = userIds.map((userId) => {
        return { event_id, user_id: userId }
    })
    return await Participant.bulkCreate(invitations)
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
    deleteEvent,
    createUser,
    deleteUser,
    inviteUser,
    inviteUsers
}
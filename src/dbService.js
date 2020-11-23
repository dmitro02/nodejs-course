const { Sequelize } = require('sequelize')
const initModels = require('./models/init-models')

const sequelize = new Sequelize({
    host: '34.89.206.41',
    port: 3306,
    database: 'calendar',
    username: 'root',
    password: 'bosean',
    dialect: 'mysql'
});

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

const {
    Event,
    Participant,
    User,
  } = initModels(sequelize)

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

// Example: createEvent('My First Event', 'Odessa', '2020-12-30', '14:00', 1)
const createEvent = async (title, location, date, time, creator_id) => {
    return await Event.create({
        title, 
        location,
        date,
        time,
        creator_id
    })
}

const getEventByTitle = async (title) => {
    const events = await Event.findAll({
        where: { title }
    })
    if (events.length) {
        return events[0]
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

inviteUserExample()

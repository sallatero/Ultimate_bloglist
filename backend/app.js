//const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const { tokenExtractor, errorHandler, unknownEndpoint, requestLogger } = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const logger = require('./utils/logger')

app.use(cors())
app.use(bodyParser.json())
app.use(requestLogger)

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//Yhdistetään tietokantaan
logger.info('connecting to db at ', config.mongoUrl)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB: ', error.message)
  })

app.use(tokenExtractor)

//Otetaan routerit käyttöön
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')


//  ignore non existent fields in our schema
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_DB_URI)
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.error('error connecting to MongoDB', err.message))

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

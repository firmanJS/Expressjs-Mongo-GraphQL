const express = require('express')

const app = express()
const cors = require('cors')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const xss = require('xss-clean')
const morgan = require('morgan')
const { graphqlHTTP } = require('express-graphql')
const { notFoundHandler, errorHandler } = require('./helpers/exceptions')
const { MORGAN_FORMAT } = require('./helpers/constant')
const routing = require('./routes')
const graphqlSchema = require('./graphql/schema')
const dbConfig = require('./config/db')
require('dotenv').config()

app.use(compress()) // gzip compression
app.use(methodOverride()) // lets you use HTTP verbs
app.use(helmet()) // secure apps by setting various HTTP headers
app.use(cors()) // enable cors
app.options('*', cors()) // cors setup
app.use(express.json({ limit: '200kb' })) // json limit

const morganFormat = MORGAN_FORMAT
const isGraphiql = String(process.env.IS_GRAPHQL) === 'true'
app.use(morgan(morganFormat, { stream: process.stderr }))
// remove favicon
app.get('/favicon.ico', (_req, res) => {
  res.status(204)
  res.end()
})
dbConfig.connectWithRetry() // connect to mongodb
app.use(xss()) // handler xss attack
app.use(routing) // routing
// graphql
app.use(
  '/graphql',
  graphqlHTTP(() => ({
    graphiql: isGraphiql, // set false if production mode
    schema: graphqlSchema
  }))
)
app.use(notFoundHandler) // 404 handler
app.use(errorHandler) // error handlerr

module.exports = app

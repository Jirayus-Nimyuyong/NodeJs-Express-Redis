const express = require('express')
const config = require('config')
// const redis = require('redis')
// const ConnectRedis = require('connect-redis')
// const session = require('express-session')

const router = require('./router/router')

const PORT = config.get('app.port') || 5000

// const RedisStore = new ConnectRedis(session)
// const redisClient = redis.createClient(config.get('redis.uri'))

const app = express()

app.set('trust proxy', 1)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   name: 'sid',
//   resave: true,
//   saveUninitialized: true,
//   secret: config.get('session.secret'),
//   cookie: config.get('session.cookie'),
//   proxy: config.get('session.proxy')
// }))

app.get('/test', (req, res) => { res.send('API Running !!!') })

app.use(router)

app.listen(PORT, () => {
  console.log(`Server Startd on Port ${PORT}`)
})

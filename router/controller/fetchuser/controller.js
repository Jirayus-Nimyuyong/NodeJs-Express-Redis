const config = require('config')
const redis = require('redis')
const axios = require('axios')

const redisClient = redis.createClient(config.get('redis.uri'))
const fetchMyGithupProfile = (req, res) => {
  try {
    const username = req.query.username || 'gotjirayus'
    const url = `${config.get('githup.url')}${username}`
    redisClient.get(username, async (_err, reply) => {
      if (_err) {
        res.status(400).json({
          status: 400,
          message: 'Something went wrong!'
        })
      } else if (reply) {
        res.status(200).json(JSON.parse(reply))
      } else {
        const response = await axios.get(url)
        redisClient.setex(username, 60, JSON.stringify(response.data))
        res.status(200).json(response.data)
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

module.exports = {
  fetchMyGithupProfile
}

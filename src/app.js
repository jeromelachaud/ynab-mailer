require('dotenv').config()

// const schedule = require('node-schedule')
const request = require('./request')

// schedule.scheduleJob({ hour: 17, minute: 4, second: 39 }, () => {})
request()

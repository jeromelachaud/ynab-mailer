require('dotenv').config()

const schedule = require('node-schedule')
const request = require('./request')

schedule.scheduleJob({ hour: 19, minute: 0, second: 0 }, () => {
  request()
})

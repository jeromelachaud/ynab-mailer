require('dotenv').config()

const schedule = require('node-schedule')
const request = require('./request')

schedule.scheduleJob({ hour: 10, minute: 0, second: 0 }, () => {
  request()
})

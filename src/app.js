/* eslint-disable indent */
require('dotenv').config()

const schedule = require('node-schedule')
const request = require('./request')
process.env.NODE_ENV !== 'development'
  ? schedule.scheduleJob({ hour: 10, minute: 0, second: 0 }, () => {
      request()
    })
  : request()

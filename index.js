/* eslint-disable indent */
require('dotenv').config()

const schedule = require('node-schedule')
const app = require('./src/app')
process.env.NODE_ENV !== 'development'
  ? schedule.scheduleJob({ hour: 10, minute: 0, second: 0 }, () => {
      app()
    })
  : app()

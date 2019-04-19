/* eslint-disable indent */
require('dotenv').config()
const schedule = require('node-schedule')

const fetchTransactions = require('./lib/fetchTransactions')
const mailer = require('./lib/mailer')

const app = async () => {
  const transactions = await fetchTransactions()
  mailer(transactions)
}
process.env.NODE_ENV !== 'development'
  ? schedule.scheduleJob({ hour: 10, minute: 0, second: 0 }, () => {
      app()
    })
  : app()

/* eslint-disable indent */
require('dotenv').config()
const schedule = require('node-schedule')

const fetchTransactions = params => require('./lib/fetch')(params)
const mailTransactions = (transactions, template) =>
  require('./lib/mailer')(transactions, template)

const app =
  process.env.NODE_ENV !== 'development'
    ? async () => {
        schedule.scheduleJob({ hour: 10, minute: 0, second: 0 }, async () => {
          const transactions = await fetchTransactions('sinceYesterday')
          mailTransactions(transactions, 'daily')
        })
        schedule.scheduleJob('1 10 1 * *', async () => {
          const transactions = await fetchTransactions(
            'sinceFirstDateOfThePreviousMonth'
          )
          mailTransactions(transactions, 'monthly')
        })
      }
    : async () => {
        const transactions = await fetchTransactions('sinceYesterday')
        mailTransactions(transactions, 'monthly')
      }

app()

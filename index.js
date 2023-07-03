/* eslint-disable indent */
require('dotenv').config()
const schedule = require('node-schedule')
const config = require('./config')
const fetchTransactions = params => require('./lib/fetch')(params)
const mailTransactions = (transactions, template, recipient) =>
  require('./lib/mailer')(transactions, template, recipient)

const app =
  process.env.NODE_ENV !== 'development'
    ? async () => {
        schedule.scheduleJob({ hour: 10, minute: 0, second: 0 }, async () => {
          const transactions = await fetchTransactions('sinceYesterday')
          mailTransactions(transactions, 'daily', [config.emailRecipient1])
        })
        schedule.scheduleJob('1 10 1 * *', async () => {
          const transactions = await fetchTransactions(
            'sinceFirstDateOfThePreviousMonth'
          )
          mailTransactions(transactions, 'monthly', [config.emailRecipient1])
        })
        schedule.scheduleJob('2 10 * * 1', async () => {
          const transactions = await fetchTransactions(
            'sinceMondayOfThePreviousWeek'
          )
          mailTransactions(transactions, 'weekly', [config.emailRecipient1])
        })
      }
    : async () => {
        const transactions = await fetchTransactions(
          'sinceMondayOfThePreviousWeek'
        )
        mailTransactions(transactions, 'weekly', [config.emailRecipient1])
      }

app()

/* eslint-disable indent */
require('dotenv').config()
const schedule = require('node-schedule')

const fetchTransactions = params => require('./lib/fetch')(params)
const mailTransactions = (transactions, template, recipient) =>
  require('./lib/mailer')(transactions, template, recipient)

const app =
  process.env.NODE_ENV !== 'development'
    ? async () => {
        schedule.scheduleJob({ hour: 10, minute: 0, second: 0 }, async () => {
          const transactions = await fetchTransactions('sinceYesterday')
          mailTransactions(transactions, 'daily', [
            process.env.EMAIL_RECIPIENT_1,
          ])
        })
        schedule.scheduleJob('1 10 1 * *', async () => {
          const transactions = await fetchTransactions(
            'sinceFirstDateOfThePreviousMonth'
          )
          mailTransactions(transactions, 'monthly', [
            process.env.EMAIL_RECIPIENT_1,
            process.env.EMAIL_RECIPIENT_2,
          ])
        })
        schedule.scheduleJob('2 10 * * 1', async () => {
          const transactions = await fetchTransactions(
            'sinceMondayOfThePreviousWeek'
          )
          mailTransactions(transactions, 'weekly', [
            process.env.EMAIL_RECIPIENT_1,
            process.env.EMAIL_RECIPIENT_2,
          ])
        })
      }
    : async () => {
        const transactions = await fetchTransactions(
          'sinceMondayOfThePreviousWeek'
        )
        mailTransactions(transactions, 'weekly', [
          process.env.EMAIL_RECIPIENT_1,
        ])
      }

app()

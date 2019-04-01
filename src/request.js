/* eslint camelcase: ["off"] */
const axios = require('axios')
const nodemailer = require('nodemailer')
const Email = require('email-templates')
const config = require('../config/')
const currencyFormatter = require('currency-formatter')
function getYesterdaysDate() {
  var date = new Date()
  date.setDate(date.getDate() - 1)
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}
module.exports = () => {
  axios.defaults.headers.common.Authorization = config.token
  axios.defaults.baseURL = 'https://api.youneedabudget.com/v1/budgets/'

  axios
    .get(`${config.budgetId}/accounts/${config.accountId}/transactions`, {
      params: { since_date: getYesterdaysDate() },
    })
    .then(response => {
      console.log(response.headers['x-rate-limit'])
      const {
        data: {
          data: { transactions },
        },
      } = response

      if (transactions.length < 1) return

      const filteredTransactions = transactions
        .filter(
          transaction =>
            transaction.approved && transaction.category_name !== null
        )
        .map(transaction => ({
          amount: currencyFormatter.format(transaction.amount / 1000, {
            code: 'EUR',
          }),
          category_name: transaction.category_name,
          memo: transaction.memo,
        }))

      const email = new Email({
        message: {
          from: `"Jerome" <${process.env.EMAIL_SENDER}>`,
          replyTo: `${process.env.EMAIL_REPLY_TO}`,
          cc: `${process.env.EMAIL_CC}`,
          to: `${process.env.EMAIL_RECIPIENT}`,
        },
        send: true,
        transport: nodemailer.createTransport(
          config.smtpSettings[process.env.NODE_ENV].transporter
        ),
      })

      email
        .send({
          template: 'mars',
          locals: {
            message: 'Coucou 🤗, voici les dépenses du jour 😇',
            filteredTransactions,
          },
        })
        .then(console.log)
        .catch(console.error)
    })
    .catch(error => console.log(error))
}

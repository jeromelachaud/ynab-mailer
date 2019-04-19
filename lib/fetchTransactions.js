const axios = require('axios')

const config = require('../config')

function getYesterdaysDate() {
  var date = new Date()
  date.setDate(date.getDate() - 1)
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
}

axios.defaults.headers.common.Authorization = config.token
axios.defaults.baseURL = 'https://api.youneedabudget.com/v1/budgets/'

const fetchTransactions = async () => {
  try {
    const response = await axios.get(
      `${config.budgetId}/accounts/${config.accountId}/transactions`,
      {
        params: { since_date: getYesterdaysDate() },
      }
    )
    console.log(response.headers['x-rate-limit'])
    const {
      data: {
        data: { transactions },
      },
    } = response
    if (transactions.length < 1) return
    return transactions
  } catch (error) {
    console.log(error)
  }
}

module.exports = fetchTransactions

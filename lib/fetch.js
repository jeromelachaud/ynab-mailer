/* eslint-disable indent */
const axios = require('axios')

const config = require('../config')
const dateHelpers = require('./dateHelpers')

axios.defaults.headers.common.Authorization = config.token
axios.defaults.baseURL = 'https://api.youneedabudget.com/v1/budgets/'

const fetch = async sinceDate => {
  let since_date
  switch (sinceDate) {
    case 'sinceYesterday':
      since_date = dateHelpers.getYesterdaysDate()
      break
    case 'sinceFirstDateOfThePreviousMonth':
      since_date = dateHelpers.getFirstDateOfThePreviousMonth()
      break
    case 'sinceMondayOfThePreviousWeek':
      since_date = dateHelpers.getMondayOfThePreviousWeek()
      break
    default:
      console.log('an error occured with the date')
  }

  try {
    const response = await axios.get(
      `${config.budgetId}/accounts/${config.accountId}/transactions`,
      {
        params: {
          since_date,
        },
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
    console.log(error.response.data)
    return error.response.status
  }
}

module.exports = fetch
